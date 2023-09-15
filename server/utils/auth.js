const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateAuthToken(user){
    const payload = {
        userId: user._id,
        userName: user.username
    }
    const secretKey = process.env.SECRET_KEY
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secretKey,options)
}

module.exports = 
    generateAuthToken
