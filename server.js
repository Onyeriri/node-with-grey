const fsPromises = require('fs').promises;
const path = require('path');
const { start } = require('repl');


const fileOps = async () => {
    try {
        await fsPromises.writeFile(path.join(__dirname, 'chapter-02', 'starter.txt'), 'Hello, world!!!');
        const data = await fsPromises.readFile(path.join(__dirname, 'chapter-02', 'starter.txt'), 'utf-8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'chapter-02', 'starter.txt'));
        await fsPromises.appendFile(path.join(__dirname, 'chapter-02', 'reply.txt'), 'hello world');
    } catch (error) {
        console.log(error);
    }
};

fileOps();


// exit on uncaught error
process.on('uncaughtException', err => {
    console.error('There was an uncaught error: ', err);
    process.exit(1);
});