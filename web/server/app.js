
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

    socket.session = {};
    socket.session.interval = setInterval(() => {
        socket.emit("log", {
            app: 'apache',
            data: [
                {
                    date: '10/Jun/2021:21:54:36',
                    http_version: '1.1',
                    ip: '192.168.1.197',
                    method: 'GET',
                    referrer: '-',
                    request_path: '/shell_uploader.php',
                    response_size: '492',
                    status_code: '404',
                    tag: 'Evil request',
                    user_agent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36'
                }
            ],
            date: '2021-06-10T21:54:36+00:00',
            host: 'analog-client',
            id: 'dc370103-68ed-4ea5-9888-0571263e2d1e'
        });
    }, 3000);

    socket.on('disconnect', () => {
        console.log('a user disconnected');
        clearInterval(socket.session.interval)
    });
});

server.listen(3000, () => {
    console.log(`Server running`);
});