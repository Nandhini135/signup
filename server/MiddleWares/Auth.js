const jwt = require('jsonwebtoken');

const ensureAuthenticated =(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
            .json({message:'Unauthorized, JWT token is require'});
    }
    try{
        JWT_SECRET="secret-123"; //.env
        const decoded =jwt.verify(auth, JWT_SECRET);
        req.user =decoded;
        next();
    }catch{
        return res.status(403)
                .json({message:"Unauthorized, JWT token wrong or exired"})
    }
}


module.exports=ensureAuthenticated;