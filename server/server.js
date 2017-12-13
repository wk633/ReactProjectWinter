const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.DB_URL, ()=>{
    console.log(`connect DB ${config.DB_URL} success`);
});

const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
}));

// // create
// User.create({
//     name: 'aaa',
//     age: 18
// }, (err, doc) => {
//     if (!err){
//         console.log(doc);
//     }else{
//         console.log(err);
//     }
// });

// // update
// User.update({'name': 'aaa'}, {'$set': {age: 28}},(err, doc) => {
//     if (!err){
//         console.log(doc);
//     }else{
//         console.log(err);
//     }
// })

// // delete
// User.remove({'name': 'aaa'}, (err, doc) => {
//     if (!err){
//         console.log(doc);
//     }else{
//         console.log(err);
//     }
// })

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello World`);
});

app.get('/data', (req, res) => {
    User.find({}, (err, doc) => {
        res.json(doc);
    });  
})

app.listen(config.SERVER_PORT, ()=>{
    console.log(`Server start at port ${config.SERVER_PORT}`);
});