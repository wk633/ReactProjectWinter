const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

Router.get('/info', (req, res) => {
    return res.json({code: 1});
})

Router.get('/list', (req, res) => {
    User.find({}, (err, doc)=>{
        return res.json(doc);
    })
})

Router.post('/register', (req, res) => {
    console.log(req.body);
    const {user, pwd, type} = req.body;
    User.findOne({user: user}, (err, doc)=>{
        if(err) return res.json({code: 1, msg: 'server error'});
        if(doc) {
            return res.json({code: 1, msg: 'duplicate username'});
        }else{
            User.create({user, pwd: md5pwd(pwd), type}, (e, d)=>{
                if(e){
                    return res.json({code: 1, msg: 'db save error'});
                }else{
                    return res.json({code: 0});
                }
            })
        }
    })
})

Router.post('/login', (req, res) => {
    console.log(req.body);
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5pwd(pwd)}, {pwd: 0}, (err, doc) => {
        if(err) return res.json({code: 1, msg: 'server error'});
        if(doc){
            return res.json({code: 0, data: doc});
        }else{
            return res.json({code: 1, msg: 'wrong username or password'});
        }
    })
})

function md5pwd(pwd){
    const salt = "somecrazyrandomstringpassword@~~@";
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;