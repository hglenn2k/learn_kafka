import { Schema, model } from 'mongoose';

const bankAccountSchema = new Schema({
    AccountId: { type: Number, required: true },
    Name: { type: String, required: true },
    Country: { type: String, required: true },
    Balance: { type: Number, required: true },
});

export const BankAccount = model('BankAccount', bankAccountSchema);