import mongoose from 'mongoose';

const MONGO_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_DOMAIN}:${process.env.MONGO_PORT}`;

await mongoose.connect(MONGO_URI);

export default mongoose.connection;