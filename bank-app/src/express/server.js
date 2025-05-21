const express = require('express');
const app = express();
app.use(express.json());
const routeModelPairs = require("./routeModelPairs");
const {route} = require("express/lib/application");

app.post('/bankaccounts', async (req, res) => {
    const { _id, Name, Country, Balance } = req.body;

    try {
        const updated = await routeMode.findOneAndUpdate(
            { _id },
            { Name, Country, Balance },
            { new: true, upsert: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/bankaccounts', async (req, res) => {
    const { _id } = req.body;

    try {
        await BankAccount.findByIdAndDelete(_id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
