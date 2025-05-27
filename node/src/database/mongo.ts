import mongoose from 'mongoose';

const MONGO_URI = `mongodb://${process.env.MONGO_DOMAIN}:${process.env.MONGO_PORT}/bank`;

let connection: typeof mongoose.connection | null = null;

export const connectMongo = async (): Promise<typeof mongoose.connection> => {
    if (!connection) {
        await mongoose.connect(MONGO_URI);
        connection = mongoose.connection;
    }
    return connection;
};

export default mongoose;