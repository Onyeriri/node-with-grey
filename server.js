const fs = require('fs');
const path = require('path');

// console.log();

fs.readFile(path.join(__dirname, 'chapter-02', 'starter.txt'), 'utf-8', (err, data) => {
    if (err) throw err;

    console.log(data);
});

fs.writeFile(path.join(__dirname, 'chapter-02', 'reply.txt'), 'Hi, nice to meet you', (err) => {
    if (err) throw err
    
    console.log('Write complete');
})

fs.appendFile(path.join(__dirname, 'chapter-02', 'test.txt'), 'Thank you', (err) => {
    if (err) throw err
    
    console.log('Append complete');
})

// exit on uncaught error
process.on('uncaughtException', err => {
    console.error('There was an uncaught error: ', err);
    process.exit(1);
})