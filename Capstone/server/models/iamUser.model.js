const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const iamUser = new Schema({
    UserName:{
        type:String,
       
    },
    UserId:{
        type:String,
       
    },
    Arn:{
        type:String,
        
    },
    CreatedDate:{
        type: Date,
      
    }
})

const iamUserModel = mongoose.model('iamUser',iamUser)

module.exports = iamUserModel