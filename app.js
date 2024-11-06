const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let reservedNumbers = {};

app.post('/reserve', (req, res) => {
    const { number, name, phone } = req.body;

    if (!reservedNumbers[number]) {
        reservedNumbers[number] = { name, phone, timestamp: Date.now() };

        setTimeout(() => {
            const reservation = reservedNumbers[number];
            if (reservation && Date.now() - reservation.timestamp >= 30 * 60 * 1000) {
                delete reservedNumbers[number];
            }
        }, 30 * 60 * 1000); // 30 minutos

        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/admin', (req, res) => {
    res.json(reservedNumbers);
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
