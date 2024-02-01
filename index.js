const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Socket Connection
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', (message) => {
        console.log('user message: ', message);
        io.emit('message', message);
    });
});

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
})

server.listen(3000, () => {
    console.log('Listening on port http://localhost:3000');
})