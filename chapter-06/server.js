const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3500;

// chaining handlers
const one = (req, res, next) => {
    console.log('One');
    next();
}

const two = (req, res, next) => {
    console.log('Two');
    next();
}

const three = (req, res) => {
    console.log('Three');
    res.send('Finished!!!');
}

app.get('/chain(.html)?', [one, two, three])

app.get('^/$|/index(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, 'new-page.html');
});

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(PORT, () => console.log(`App running on port ${PORT}...`));

