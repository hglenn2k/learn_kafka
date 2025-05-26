const express = import("express");
const app = express();
app.use(express.json());

app.post('/account', async () => {

});

app.delete('/account', async () => {

});

const PORT = 3000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
