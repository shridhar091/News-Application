const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    let token = req.header('authorization')
    if (token) {
        token = token.split(' ')[1]
        try {
            const tokendata = jwt.verify(token, process.env.JWT_KEY)
            req.user = {
                id: tokendata.id,
                name: tokendata.name,
                userId:tokendata.userId
            }
            next()
        } catch (error) {
            res.json(error)
        }
    } else {
        res.json({ error: "Token Not Present" })
    }
}

module.exports = authenticateUser