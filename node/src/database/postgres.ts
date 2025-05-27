import { Client } from 'pg';
import { createIntegrationsTable } from '../model/postgres/Integration';

let client: Client | null = null;

export const connectPostgres = async (): Promise<Client> => {
    if (!client) {
        client = new Client({
            host: process.env.POSTGRES_DOMAIN,
            port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB_INTEGRATIONS,
        });

        await client.connect();
        await createIntegrationsTable(client);
    }
    return client;
};

export default connectPostgres;