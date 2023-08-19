const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

exports.logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\thh:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'), () => console.log('Directory created.'));
        }

        await fsPromises.appendFile(path.join(__dirname, 'logs', 'logger.txt'), logItem, () => {
            console.log('File append completed!!!');
        })
    } catch (error) {
       console.error(error); 
    }

    console.log(logItem);
};

