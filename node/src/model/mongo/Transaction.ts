import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    fromAccountName: { type: String, required: true },
    toAccountName: { type: String, required: true },
    amount: { type: Number, required: true },
    fraudFlag: { type: Boolean, required: false, default: false },
    fraudFlagReason: { type: String, required: false, default: ""}
}, {
    collection: 'transactions'
});

export const Transaction = model('Transaction', transactionSchema);