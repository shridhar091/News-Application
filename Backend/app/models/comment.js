const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema= new Schema({
    comment:{
        type : String
    },
    articleId:{
        type:String,
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Comment = mongoose.model("Comment",commentSchema)
module.exports = Comment