const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const cors = require('cors');

app.use(cors());

app.use(express.json());

const corsOptions = {
    origin: 'localhost:3000/api/data',
    methods: 'GET,,POST',
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));




app.post('/api/data', (req, res) => {
    const { numbers, timestamp } = req.body;

    const dbFilePath = path.join(__dirname, './db.json');
    const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    const newData = {
        numbers,
        timestamp,
    };

    dbData.data.push(newData);
    fs.writeFileSync(dbFilePath, JSON.stringify(dbData, null, 2));
    res.json({ message: 'Data stored successfully' });
});


app.get('/api/data', (req, res) => {
    const dbFilePath = path.join(__dirname, 'db.json');

    const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    res.json(dbData.data);
});








const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
