import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    TransactionId: { type: Number, required: true },
    FromAccountId: { type: Number, required: true },
    ToAccountId: { type: Number, required: true },
    Amount: { type: Number, required: true },
    FraudFlag: { type: Boolean, required: true },
    FraudFlagReason: { type: String, required: true }
});

export const Transaction = model('Transaction', transactionSchema);