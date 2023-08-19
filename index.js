// const fs = require('fs');

// fs.mkdir('./chapter-03', () => {
//     console.log('Directory created');
// })

const { format } = require('date-fns');
const {v4: uuid} = require('uuid')

const date = format(new Date(), 'yyyy-MM-dd\thh:mm:ss');

console.log(date);
console.log(uuid());