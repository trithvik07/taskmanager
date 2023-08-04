var jwt = require('jsonwebtoken');
const JWT_SIGN = "rithvik1@"
const fetchuser = (req,res,next)=>{
    //get the user from the jwt token and addid to req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try{    const string = jwt.verify(token,JWT_SIGN);
        req.user = string.user
        next()
    }
    catch(error){
        res.status(401)
        }
}
module.exports = fetchuser