const jwt=require('jsonwebtoken')
const config=require('config')

//Middleware Function

module.exports = (req,res,next) =>{
    //Get Token from the header
    const token=req.header('x-auth-token');

    if(!token){
        return res.status(401).json({msg:'No Token found'})
    }

    //Verifying the token
    try{
        const decoded=jwt.verify(token,config.get('jwtSecret'))
        req.user=decoded.user
        next();
    }
    catch(err){
        res.status(401).json({msg:'Not valid'})
    }
}