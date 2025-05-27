import { Schema, model } from 'mongoose';

const bankAccountSchema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    balance: { type: Number, required: true },
}, {
    collection: 'accounts'
});

export const BankAccount = model('BankAccount', bankAccountSchema);