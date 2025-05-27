import mClient from '@/database/mongo';
import pgClient from '@/database/postgres';

export const db = {
    mongo: mClient,
    postgres: pgClient
};