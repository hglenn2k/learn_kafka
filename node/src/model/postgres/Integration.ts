import { Client } from 'pg';

export const createIntegrationsTable = async (client: Client) => {
    await client.query(`
        CREATE TABLE IF NOT EXISTS integrations (
            id SERIAL PRIMARY KEY,
            loglevel VARCHAR(50) NOT NULL,
            payload TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
};