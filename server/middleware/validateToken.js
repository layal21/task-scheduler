const sendResponse = require('../helpers/sendResponse')
const validateToken = (req,res,next)=>{
const token = req.headers.authorization
if(!token){
    return sendResponse(res,401,{message: "Unauthorized"})
}
if(token.includes(token)){
    return sendResponse(res,401,{message: "Token is invalid"})
}
next()
}

module.exports = validateToken