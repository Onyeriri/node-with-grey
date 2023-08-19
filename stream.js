const fs = require('fs');
const path = require('path');

const rs = fs.createReadStream(path.join(__dirname, 'chapter-02', 'lorem.txt'), { encoding: 'utf8' });
const ws = fs.createWriteStream(path.join(__dirname, 'chapter-02', 'viktor.txt'));

rs.pipe(ws);