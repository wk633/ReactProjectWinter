const express = require('express');
const config = require('./config');

const app = express();

app.use('/', (req, res) => {
    res.send(`Hello World`);
});

app.listen(config.port, ()=>{
    console.log(`Server start at port ${config.port}`);
});