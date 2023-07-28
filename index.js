import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

const server = http.createServer(app)
const io = new Server(server, {cors: {origin: 'http://localhost:3000'}})

const PORT = 3001;

io.on('connection', socket => {
    console.log('Usuário conectado!', socket.id);

    socket.on('disconnect', reason => {
        console.log('User disconnected:', reason);
    })

    socket.on('set_username', username => {
        socket.data.username = username;
        console.log(socket.data.username);
    })

    socket.on('message', text => {
        io.emit('receive_message', {text, authorId: socket.id, author: socket.data.username})
    })
})

server.listen(PORT, () => console.log('Server running!'));