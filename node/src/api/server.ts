import express, { Request, Response } from 'express';
import { Kafka } from 'kafkajs';
import { initializeKafka, TOPICS, publishToKafka } from '@/service/kafkaService';
import { processTransactionWithFraudCheck } from '@/service/fraudService';
import { LogIntegration } from '@/api/logger';
import { connectMongo } from '@/database/mongo';
import { BankAccount } from '@/model/mongo/BankAccount';
import { Transaction } from '@/model/mongo/Transaction';

const app = express();
app.use(express.json());

app.post('/account', async (req: Request, res: Response) => {
    try {
        await LogIntegration(`Begin POST /account`, 1, JSON.stringify(req.body));

        const { name, country, balance = 0 } = req.body;
        if (!name || !country) {
            res.status(400).json({ error: 'name and country are required' });
            return;
        }

        const account = new BankAccount({name, country, balance});
        await account.save();

        res.status(200).json({ success: true, message: 'Account created' });
        await LogIntegration(`End POST /account - 200`, 1, JSON.stringify(req.body));
    } catch (error) {
        await LogIntegration(`Error in POST /account: ${error}`, 3, JSON.stringify(req.body));
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/account', async (req: Request, res: Response) => {
    try {
        await LogIntegration(`Begin DELETE /account`, 1, JSON.stringify(req.body));

        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'name is required' });
            return;
        }

        await BankAccount.deleteOne({ name });

        res.status(200).json({ success: true, message: 'Account deleted' });
        await LogIntegration(`End DELETE /account - Success`, 1, JSON.stringify(req.body));
    } catch (error) {
        await LogIntegration(`Error in DELETE /account: ${error}`, 3, JSON.stringify(req.body));
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/transaction', async (req: Request, res: Response) => {
    try {
        await LogIntegration(`Begin POST /transaction`, 1, JSON.stringify(req.body));

        const { fromAccountName, toAccountName, amount, fraudFlag = false, fraudFlagReason = '' } = req.body;
        if (!fromAccountName || !toAccountName || !amount) {
            res.status(400).json({ error: 'fromAccountName, toAccountName, and amount are required' });
            return;
        }

        const transaction = new Transaction({
            fromAccountName,
            toAccountName,
            amount,
            fraudFlag,
            fraudFlagReason
        });
        await transaction.save();

        await publishToKafka(TOPICS.TRANSACTIONS, {
            transactionId: transaction._id.toString(),
            fromAccountName,
            toAccountName,
            amount
        });

        res.status(200).json({success: true, message: `Transaction processed`});
        await LogIntegration(`End POST /transaction - Success`, 1, JSON.stringify(req.body));
    } catch (error) {
        await LogIntegration(`Error in POST /transaction: ${error}`, 3, JSON.stringify(req.body));
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/stream/integration', async (req: Request, res: Response) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });

    const kafka = new Kafka({ clientId: 'integration-stream', brokers: ['kafka:9092'] });
    const consumer = kafka.consumer({ groupId: 'integration-stream-group' });

    try {
        await consumer.connect();
        await consumer.subscribe({ topic: TOPICS.INTEGRATION_LOGS });
        await consumer.run({
            eachMessage: async ({ message }) => {
                if (message.value) {
                    const data = JSON.parse(message.value.toString());
                    res.write(`data: ${JSON.stringify(data)}\n\n`);
                }
            }
        });
    } catch (error) {
        console.error('Failed to connect integration stream consumer:', error);
        res.end();
    }

    req.on('close', async () => {
        await consumer.disconnect();
    });
});

app.get('/stream/fraud', async (req: Request, res: Response) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
    });

    const kafka = new Kafka({ clientId: 'fraud-stream', brokers: ['kafka:9092'] });
    const consumer = kafka.consumer({ groupId: 'fraud-stream-group' });

    try {
        await consumer.connect();
        await consumer.subscribe({ topic: TOPICS.FRAUD_RESULTS });
        await consumer.run({
            eachMessage: async ({ message }) => {
                if (message.value) {
                    const data = JSON.parse(message.value.toString());
                    res.write(`data: ${JSON.stringify(data)}\n\n`);
                }
            }
        });
    } catch (error) {
        console.error('Failed to connect fraud stream consumer:', error);
        res.end();
    }

    req.on('close', async () => {
        await consumer.disconnect();
    });
});

const PORT = process.env.PORT || 8000;

const startFraudProcessor = async () => {
    const kafka = new Kafka({ clientId: 'fraud-processor', brokers: ['kafka:9092'] });
    const consumer = kafka.consumer({ groupId: 'fraud-processing-group' });

    await consumer.connect();
    await consumer.subscribe({ topic: TOPICS.TRANSACTIONS });

    await consumer.run({
        eachMessage: async ({ message }) => {
            if (message.value) {
                const transactionData = JSON.parse(message.value.toString());
                const { transactionId, fromAccountName, toAccountName, amount } = transactionData;

                await processTransactionWithFraudCheck(transactionId, fromAccountName, toAccountName, amount);
            }
        }
    });

    console.log('Fraud processor started');
};

const startServer = async () => {
    try {
        await connectMongo();
        console.log('Connected to MongoDB');

        await initializeKafka();
        console.log('Connected to Kafka');

        await startFraudProcessor();

        app.listen(PORT, () => {
            console.log(`API listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();