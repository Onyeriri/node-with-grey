const fs = require('fs');

if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) {
            console.log('File created.');
        };
    });
    
};

if (fs.existsSync('./new')) {
    fs.rmdir('./new', () => {
        console.log('File removed.');
    })
}

process.on('uncaughtException', (err) => {
    if (err) {
        console.log(err)
    }
})