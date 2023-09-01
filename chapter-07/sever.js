const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// cross origin resource sharing
const permission = ['https://www.youtube.com', 'http://127.0.0.1', 'http://localhost:3500/'];
const corsOptions = {
    origin: (origin, callback) => {
        if (permission.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

// middleware for form data
app.use(express.urlencoded({ extended: false }));
// middleware for json files
app.use(express.json());
// middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.all('*', (req, res) => {
    res.status(404);

    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ err: '404 Not Found' });
    } else
        res.type('txt').send('404 Not Found');
});

// error handler
app.use(errorHandler);

// server running on port 3500
app.listen(PORT, () => console.log(`App listening to port ${PORT}`))
