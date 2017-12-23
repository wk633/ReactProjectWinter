const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.DB_URL, ()=>{
    console.log(`connect DB ${config.DB_URL} success`);
});

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, requrie: true},
        'type': {type: String, require: true},
        'avatar': {type: String},
        // personal introduction
        'desc': {type: String},
        // job wanted/ the job title
        'title': {type: String},
        // if you are boss
        'company': {type: String},
        'money': {type: String}
    },
    chat: {
        'chatId': {type: String},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: Boolean, default: false},
        'content': {type: String, require: true, default: ''},
        'create_time': {type: Number, default: new Date().getTime()}
    }
}

for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}
module.exports = {
    getModel: (name)=>mongoose.model(name)
}