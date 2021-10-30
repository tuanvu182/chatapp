const express = require('express');
var cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer);
let user = 0;

io.on('connection', socket => {
    
    socket.on('add_user', () => {
        user++;
    })

    socket.on('get_user_number', () => {
        socket.emit('users', user)
    })

    // socket.on('disconnect', () => {
    //     socket.broadcast.emit('users', user)
    // })

    socket.on('send_msg', (msg) => {
        socket.broadcast.emit('broadcast_msg', msg)
    })
})

const _PORT = 5000;

httpServer.listen(_PORT, () => console.log(`...Listening on ${_PORT}`))