const Comment = require('../models/comment')

const commentArticle = {}

commentArticle.create=async(req,res)=>{
    try {
        const {body}=req
        const userId = req.user.id
        const savedComment=await Comment.create({...body,userId:userId})
        res.json(savedComment)
    } catch (err) {
        res.json(err)
    }
}

commentArticle.listall=async(req,res)=>{
    try {
        const comments=await Comment.find()
        res.json(comments)
    } catch (err) {
        res.json(err)
    }
}

module.exports=commentArticle