const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

const chatSchema  = mongoose.Schema({
    created:{
        type:Date,
        Default:Date.now()
    },
    msg:{
        type:String
    },
    username:{
        type:String
    }
});

module.exports =  Chat = mongoose.model('chat',chatSchema,'mean_app');
module.exports.saveChat = (chat,callback)=>{
    chat.save(callback)
}