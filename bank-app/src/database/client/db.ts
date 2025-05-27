import mClient from '@/database/client/mongo';
import pgClient from '@/database/client/postgres';

export const db = {
    mongo: mClient,
    postgres: pgClient,
};