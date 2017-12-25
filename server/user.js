const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd': 0, '__v': 0};

Router.get('/info', (req, res) => {
    const {userId} = req.cookies;
    if(!userId) {
        // no cookies
        return res.json({code: 1});
    }
    User.findOne({'_id': userId}, _filter, (err, doc) => {
        if(err) return res.json({code: 1, msg: 'server error'});
        return res.json({code: 0, data: doc});
    })
    
})
Router.get('/getmsglist', (req, res) =>{
    const user = req.cookies.userId;
    User.find({}, (e, userdoc)=>{
        let users = {}
        userdoc.forEach(v=>{
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or':[{'from': user},{'to': user}]}, (err, doc)=>{
            if(!err){
                return res.json({code: 0, msgs: doc, users: users})
            }else{
                return res.json({code: 1, msg: 'server error', users: users});
            }
        })
    })
})

Router.get('/list', (req, res) => {
    const {type} = req.query
    User.find({type}, (err, doc)=>{
        return res.json({code: 0, data: doc});
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
            const userModel = new User({user, pwd: md5pwd(pwd), type});
            userModel.save((e, d) => {
                if(e){
                    return res.json({code: 1, msg: 'db save error'});
                }else{
                    console.log(d);
                    const {user, type, _id} = d;
                    res.cookie('userId', _id);
                    return res.json({code: 0, data: {user, type, _id}});
                }
            })
        }
    })
})

Router.post('/login', (req, res) => {
    console.log(req.body);
    const {user, pwd} = req.body;
    User.findOne({user, pwd: md5pwd(pwd)}, _filter, (err, doc) => {
        if(err) return res.json({code: 1, msg: 'server error'});
        if(doc){
            res.cookie('userId', doc._id);
            return res.json({code: 0, data: doc});
        }else{
            return res.json({code: 1, msg: 'wrong username or password'});
        }
    })
})

Router.post('/readmsg', (req, res)=>{
    const userId = req.cookies.userId;
    const {from} = req.body;
    console.log(userId, from);
    Chat.update({from, to:userId}, {'$set': {read: true}}, {'multi': true},(err, doc)=>{
        if(!err){
            console.log(doc);
            return res.json({code: 0, num: doc.nModified})
        }else{
            return res.json({code:1, msg:'modify unread failed'})
        }
    })
})

Router.post('/update', (req, res)=>{
    const userId = req.cookies.userId;
    if(!userId) return res.json({code: 1, msg: 'login first'});
    const body = req.body;
    User.findByIdAndUpdate(userId, body, (err, doc)=>{
        if(err) {
            return res.json({code: 1, msg:'update data failed'});
        }
        const data = Object.assign({},{
            user: doc.user,
            type: doc.type
        }, body);
        return res.json({code: 0, data});
    });
})

function md5pwd(pwd){
    const salt = "somecrazyrandomstringpassword@~~@";
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = Router;