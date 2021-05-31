
const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const api = require('./routers/api');

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

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

server.listen(3000, () => {
    console.log(`Server running`);
});