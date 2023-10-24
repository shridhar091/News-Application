const Article= require('../models/article')

const articleController={}

articleController.create = async (req, res) => {
    try {
      const { body } = req;
      const userId = req.user.id
      const savedArticle = await Article.create({...body,userId:userId});
      res.json(savedArticle);
    } catch (err) {
      res.json(err)
    }
}

articleController.list =async(req,res)=>{
    try {
        const {userId}= req.params
        const articles= await Article.find({userId:userId})
        res.json(articles)
    } catch (err) {
        res.json(err)
    }
}

articleController.listall= async(req,res)=>{
    try {
        const articles= await Article.find()
        res.json(articles)
    } catch (err) {
        res.json(err)
    }
}

articleController.destroy =async(req,res)=>{
    try {
        const {id}=req.params
        const articles=await Article.findByIdAndDelete( id ,{ new: true, runValidators: true })
        res.json(articles)
    } catch (err) {
        res.json(err)
    }
}

articleController.update = async(req,res)=>{
    try {
        const {id}=req.params
        const {body}=req
        const articles=await Article.findByIdAndUpdate( id , body ,{ new: true, runValidators: true })
        res.json(articles)
    } catch (err) {
        res.json(err)
    }
}

articleController.search = async(req,res)=>{
    const { search } = req.query
    try{
        const regex = new RegExp(search, 'i');
        const items = await Article.find({
            $or: [
                { title: { $regex: regex } }
            ]
            }).exec();
            res.json(items);
    }catch(err){
        res.json(err)
    }
}

articleController.listOne=async(req,res)=>{
    try {
        const id = req.params.id
        const article = await Article.findById(id)
        if (article) {
            res.json(article)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

articleController.sort=async(req,res)=>{
    try{
        const {type} = req.query
        let sortedArticles
        if(type == 'Most Recent') {
            sortedArticles = await Article.find().sort({ date: -1 });
        }else if(type == ''){
            sortedArticles = await Article.find()
        }
        res.json(sortedArticles)
    }catch(err){
        res.json(err)
    }
}

module.exports=articleController