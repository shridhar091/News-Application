const mongoose = require('mongoose')

const db= async()=>{
    try{
        const mongo = await mongoose.connect('mongodb://127.0.0.1:27017/News_Application')
        console.log('DB connected successfull')
    }catch(err){
        console.log(err)
    }
}

module.exports = db