const express = require('express');
const userRouter = require('./user');

const config = require('./config');

const app = express();

app.use('/user', userRouter);

app.listen(config.SERVER_PORT, ()=>{
    console.log(`Server start at port ${config.SERVER_PORT}`);
});