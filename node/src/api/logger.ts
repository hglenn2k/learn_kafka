import { connectPostgres } from '../database/postgres';

export async function LogIntegration(message: string, loglevel: 1 | 2 | 3, payload: string = ''): Promise<void> {
    try {
        const client = await connectPostgres();
        await client.query(
            `INSERT INTO integrations (loglevel, payload, message)
             VALUES ($1, $2, $3)`,
            [loglevel.toString(), payload, message]
        );
    } catch (error) {
        console.error('Failed to log integration:', error);
    }
}