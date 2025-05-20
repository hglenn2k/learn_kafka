import mClient from '../lib/mongo';
import pgClient from '../lib/postgres';

export const db = {
    mongo: mClient,
    postgres: pgClient,
};
