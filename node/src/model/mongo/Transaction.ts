import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    transactionId: { type: Number, required: true },
    fromAccountId: { type: Number, required: true },
    toAccountId: { type: Number, required: true },
    amount: { type: Number, required: true },
    fraudFlag: { type: Boolean, required: true },
    fraudFlagReason: { type: String, required: true }
}, {
    collection: 'transactions'
});

export const Transaction = model('Transaction', transactionSchema);