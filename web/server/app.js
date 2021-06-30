
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const BcryptSalt = require('bcrypt-salt');
global.bs = new BcryptSalt();

const https = require('https')
var privateKey  = fs.readFileSync('/opt/cert/analog-server.key', 'utf8');
var certificate = fs.readFileSync('/opt/cert/analog-server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
const server = https.createServer(credentials, app);
const io = require('socket.io')(server);
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