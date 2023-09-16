const permission = [
    'https://www.youtube.com',
    'http://127.0.0.1',
    'http://localhost:3500/'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (permission.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allow by CORS'));
        }
    },
    corsSuccessStatus: 200
};

module.exports = corsOptions