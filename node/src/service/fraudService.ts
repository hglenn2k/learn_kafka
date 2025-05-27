import { BankAccount } from '@/model/mongo/BankAccount';
import { Transaction } from '@/model/mongo/Transaction';
import { publishToKafka, TOPICS } from './kafkaService';

export async function processTransactionWithFraudCheck(
    transactionId: string,
    fromAccountName: string,
    toAccountName: string,
    amount: number
): Promise<void> {
    try {
        const fromAccount = await BankAccount.findOne({ name: fromAccountName });
        const toAccount = await BankAccount.findOne({ name: toAccountName });

        if (!fromAccount || !toAccount) {
            await publishToKafka(TOPICS.FRAUD_RESULTS, {
                message: `❌ Account not found: ${fromAccountName} → ${toAccountName}`
            });
            return;
        }

        const existingTransaction = await Transaction.findById(transactionId);

        if (!existingTransaction) {
            await publishToKafka(TOPICS.FRAUD_RESULTS, {
                message: `❌ Transaction record not found: ${transactionId}`
            });
            return;
        }

        const isFraud = fromAccount.country !== toAccount.country && amount > 1000;

        if (isFraud) {
            existingTransaction.fraudFlag = true;
            existingTransaction.fraudFlagReason = `Cross-border transaction exceeding $1000 (${fromAccount.country} → ${toAccount.country})`;
            await existingTransaction.save();

            await publishToKafka(TOPICS.FRAUD_RESULTS, {
                message: `🚨 FRAUD BLOCKED: ${fromAccountName} → ${toAccountName} ${amount} (${fromAccount.country} → ${toAccount.country})`
            });
        } else {
            fromAccount.balance -= amount;
            toAccount.balance += amount;

            await fromAccount.save();
            await toAccount.save();

            await publishToKafka(TOPICS.FRAUD_RESULTS, {
                message: `✅ Transaction processed: ${fromAccountName} (${fromAccount.balance}) → ${toAccountName} (${toAccount.balance}) ${amount}`
            });
        }

    } catch (error) {
        await publishToKafka(TOPICS.FRAUD_RESULTS, {
            message: `❌ Transaction error: ${error}`
        });
    }
}