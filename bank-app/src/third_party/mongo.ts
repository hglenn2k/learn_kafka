// clients/mongo.ts
import { MongoClient } from 'mongodb';

const client = new MongoClient(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_DOMAIN}:${process.env.MONGO_PORT}`,
);

export default client;