const mongoose = require ('mongoose')
const User = require('./user')
const Schema = mongoose.Schema
const articleSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    category:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
const Article= mongoose.model('Article',articleSchema)
module.exports = Article