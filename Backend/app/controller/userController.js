const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require('dotenv').config()

const userController = {}

userController.register = async(req,res) => {
    try{
        const {body} = req
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        const encrypted = await bcrypt.hash(user.password,salt)
        user.password = encrypted
        const result = await user.save()
        res.json(result)
    }catch(err){
        res.json(err)
    }
}

userController.login =async(req,res)=>{
    try {
        const {body}=req
        const user = await User.findOne({email:body.email})
        if(!user){
            res.json({error:"Invalid Email and Password"})
        }else{
            const match = await bcrypt.compare(body.password,user.password)
            if(match){
                const tokendata = {
                    id:user._id,
                    name:user.name,
                    userId:user.userId
                }
                const token = jwt.sign(tokendata,process.env.JWT_KEY)
                res.json({
                    token:`Bearer ${token}`
                })
            }else{
                res.json({error:"Invalid Email or Password"})
            }
        }
    } catch (err) {
        res.json(err)
    }
}

userController.account = (req, res)=>{
    res.json(req.user)
}

module.exports = userController