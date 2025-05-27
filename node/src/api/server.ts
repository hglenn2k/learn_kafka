import express, { Request, Response } from 'express';
//import { db } from '../database/db';
import { LogIntegration } from './logger';

const app = express();
app.use(express.json());

app.post('/account', async (req: Request, res: Response) => {
    try {
        await LogIntegration(`Begin POST /account`, 1, JSON.stringify(req.body));

        // TODO

        res.status(200).json({ success: true, message: 'Account created' });
    } catch (error) {
        await LogIntegration(`Error in POST /account: ${error}`, 3);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/account', async (req: Request, res: Response) => {
    try {
        await LogIntegration(`Begin DELETE /account`, 1, JSON.stringify(req.body));

        // TODO

        res.status(200).json({ success: true, message: 'Account deleted' });
    } catch (error) {
        await LogIntegration(`Error in DELETE /account: ${error}`, 3);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/transaction', async (req: Request, res: Response) => {
    try {
        const { from, to, amount } = req.body;

        await LogIntegration(`Transaction initiated: from ${from} to ${to}, amount: ${amount}`, 1, JSON.stringify(req.body));

        // TODO

        res.status(200).json({
            success: true,
            message: `Transaction processed: ${amount} from ${from} to ${to}`
        });
    } catch (error) {
        await LogIntegration(`Error in POST /transaction: ${error}`, 3);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});