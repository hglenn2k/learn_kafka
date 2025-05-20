import { Schema, model } from 'mongoose';

interface IBankAccount {
    AccountId: number;
    Name: string;
    Country: string;
    Balance: number;
}

const bankAccountSchema = new Schema<IBankAccount>({
    AccountId: { type: Number, required: true },
    Name: { type: String, required: true },
    Country: { type: String, required: true },
    Balance: { type: Number, required: true },
});

export const BankAccount = model<IBankAccount>('BankAccount', bankAccountSchema);