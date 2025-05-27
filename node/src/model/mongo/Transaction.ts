import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    fromAccountName: { type: String, required: true },
    toAccountName: { type: String, required: true },
    amount: { type: Number, required: true },
    fraudFlag: { type: Boolean, required: true },
    fraudFlagReason: { type: String, required: true }
}, {
    collection: 'transactions'
});

export const Transaction = model('Transaction', transactionSchema);