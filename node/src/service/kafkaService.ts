import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'bank-app',
    brokers: ['kafka:9092']
});

export const producer = kafka.producer();

export const TOPICS = {
    INTEGRATION_LOGS: 'integration-logs',
    FRAUD_RESULTS: 'fraud-results',
    TRANSACTIONS: 'transactions'
};

export async function initializeKafka(): Promise<void> {
    try {
        await producer.connect();

        const admin = kafka.admin();
        await admin.connect();
        await admin.createTopics({
            topics: [
                { topic: TOPICS.INTEGRATION_LOGS, numPartitions: 1 },
                { topic: TOPICS.FRAUD_RESULTS, numPartitions: 1 },
                { topic: TOPICS.TRANSACTIONS, numPartitions: 1 }
            ]
        });
        await admin.disconnect();

        console.log('Kafka initialized');
    } catch (error) {
        console.error('Kafka init failed:', error);
        throw error;
    }
}

export async function publishToKafka(topic: string, message: Record<string, unknown>): Promise<void> {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify({
                ...message,
                timestamp: new Date().toISOString()
            }) }]
    });
}