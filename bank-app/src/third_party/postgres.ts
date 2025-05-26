import { Client } from 'pg';

const client = new Client({
    host: process.env.POSTGRES_DOMAIN,
    port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_INTEGRATIONS
});

export default client;