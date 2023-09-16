const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logEvents');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/config');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();
const PORT = process.env.PORT || 3500;

// custom middleware
app.use(logger);

// cross origin resource sharing
app.use(cors(corsOptions));


// middleware for form data
app.use(express.urlencoded({ extended: false }));
// middleware for json files
app.use(express.json());
// middleware for cookie parser
app.use(cookieParser());
// middleware for static files
app.use('/', express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employee'));

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
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));
