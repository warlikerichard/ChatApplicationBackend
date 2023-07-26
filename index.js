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
})

server.listen(PORT, () => console.log('Server running!'));