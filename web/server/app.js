
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const Database = require('./lib/db').Database;

const api = require('./routers/api');

global.db = new Database('db', '28015', 'analog', io);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, '..', 'app', 'build', 'static')))

app.use('/api', api);

app.get('*.map', (req, res) => {
    res.sendStatus(404);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'app', 'build', 'index.html'));
});

/**
 * WEBSOCKET
 */
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.session = {};

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        clearInterval(socket.session.interval)
    });
});

server.listen(3000, () => {
    console.log(`Server running`);

    setTimeout(() => {
        global.db.init();
    }, 5000)
});