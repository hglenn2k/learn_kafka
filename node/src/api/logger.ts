import { connectPostgres } from '../database/postgres';
import { publishToKafka, TOPICS } from '@/service/kafkaService';

export async function LogIntegration(message: string, loglevel: 1 | 2 | 3, payload: string = ''): Promise<void> {
    try {
        const client = await connectPostgres();
        await client.query(
            `INSERT INTO integrations (loglevel, payload, message)
             VALUES ($1, $2, $3)`,
            [loglevel.toString(), payload, message]
        );

        await publishToKafka(TOPICS.INTEGRATION_LOGS, {
            message,
            loglevel
        });
    } catch (error) {
        console.error('Failed to log integration:', error);
    }
}