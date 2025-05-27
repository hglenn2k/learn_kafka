import express, { Request, Response } from 'express';
import { LogIntegration } from './logger';
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

        const { transactionId, fromAccountId, toAccountId, amount, fraudFlag = false, fraudFlagReason = '' } = req.body;
        if (!transactionId || !fromAccountId || !toAccountId || !amount) {
            res.status(400).json({ error: 'transactionId, fromAccountId, toAccountId, and amount are required' });
            return;
        }

        const transaction = new Transaction({
            transactionId,
            fromAccountId,
            toAccountId,
            amount,
            fraudFlag,
            fraudFlagReason
        });
        await transaction.save();

        res.status(200).json({success: true, message: `Transaction processed`});
        await LogIntegration(`End POST /transaction - Success`, 1, JSON.stringify(req.body));
    } catch (error) {
        await LogIntegration(`Error in POST /transaction: ${error}`, 3, JSON.stringify(req.body));
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectMongo();
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`API listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();