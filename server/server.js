const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');

const model = require('./model');
const Chat = model.getModel('chat');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', (socket)=>{
    socket.on('sendmsg', (data)=>{
        const {from, to, msg} = data;
        console.log('from:', from);
        console.log('to:', to);

        const chatId = [from,to].sort().join("_");
        console.log('chatId:', chatId);

        Chat.create({chatId, from, to, content: msg}, (err, doc)=>{
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})

app.use(bodyParser.json());
app.use(cookieParser());
// app.use(cors);
app.use('/user', userRouter);

server.listen(config.SERVER_PORT, ()=>{
    console.log(`Server start at port ${config.SERVER_PORT}`);
});