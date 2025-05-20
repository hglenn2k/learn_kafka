import { Schema, model } from 'mongoose';

interface ITransaction {
    TransactionId: number;
    FromAccountId: number;
    ToAccountId: number;
    Amount: number;
    FraudFlag: boolean;
    FraudFlagReason: string;
}

const transactionSchema = new Schema<ITransaction>({
    TransactionId: { type: Number, required: true },
    FromAccountId: { type: Number, required: true },
    ToAccountId: { type: Number, required: true },
    Amount: { type: Number, required: true },
    FraudFlag: { type: Boolean, required: true },
    FraudFlagReason: { type: String, required: true },
});

export const Transaction = model<ITransaction>('Transaction', transactionSchema);