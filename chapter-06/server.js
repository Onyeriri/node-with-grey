const express = require('express');

const app = express();
const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => {
    res.status(200).send('Hello world!!!');
})

app.listen(PORT, () => console.log(`App running on port ${PORT}...`));

