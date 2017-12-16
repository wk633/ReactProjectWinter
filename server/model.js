const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.DB_URL, ()=>{
    console.log(`connect DB ${config.DB_URL} success`);
});

const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: Number, require: true}
}));