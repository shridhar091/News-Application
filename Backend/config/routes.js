const express = require('express')
const userController = require('../app/controller/userController')
const authenticateUser = require('../app/middleware/authUser')
const articleController = require('../app/controller/articleController')
const commentArticle = require('../app/controller/commentArticle')
const router = express.Router()

//User
router.post('/api/register',userController.register)
router.post('/api/login',userController.login)
router.get('/api/account',authenticateUser,userController.account)

//Article
router.post('/api/article',authenticateUser,articleController.create)
router.get('/api/list/:userId',authenticateUser,articleController.list)
router.get('/api/listall',authenticateUser,articleController.listall)
router.delete('/api/delete/:id',authenticateUser,articleController.destroy)
router.put('/api/update/:id',authenticateUser,articleController.update)
router.get('/api/article/:id',authenticateUser,articleController.listOne)
router.get('/api/articles/search',authenticateUser,articleController.search)
router.get('/api/filter/sort',authenticateUser,articleController.sort)

//Comment
router.post('/api/comment',authenticateUser,commentArticle.create)
router.get('/api/comments',authenticateUser,commentArticle.listall)

module.exports = router