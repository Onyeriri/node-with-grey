const EventEmitter = require('events');
const { logEvents } = require('./chapter-04/logEvents');

class MyEmitter extends EventEmitter { }

// create an instance of the class
const myEmitter = new MyEmitter();

// add listener to event
myEmitter.on('log', (msg) => logEvents(msg));

// emit an event
setTimeout(() => {
    myEmitter.emit('log', 'Log event emitted.');
}, 2000);


