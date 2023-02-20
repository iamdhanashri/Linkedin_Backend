const jwt=require("jsonwebtoken")
const authenticate=(req,res,next)=>{
    const token=req.headers.authenticate
    if(token){
        const decoded=jwt.verify(token,"masai",(err,decoded)=>{
            if(decoded){
                req.body.user=decoded.userID
                next()
            }else{
                res.send("please login first")
            }
        })
    }
    else{
        res.send("please login first")

    }
}
module.exports={
    authenticate
}