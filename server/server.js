const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');

const app = express() ;
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', (socket)=>{
    console.log('user login');
})

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/user', userRouter);

server.listen(config.SERVER_PORT, ()=>{
    console.log(`Server start at port ${config.SERVER_PORT}`);
});