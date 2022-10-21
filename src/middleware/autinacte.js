const jwt=require("jsonwebtoken")
require("dotenv").config({path:"..//config.env"})


const verfiyaToken=(token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.PRIVATE_KEY,(err,decoded)=>{
            if(err){
                reject(err)
            }
            resolve(decoded)
        })
        
    })

}
module.exports=async (req,res,next)=>{
    if(!req?.headers?.authorization) return res.status(403).send("please provide valid authorization token")
    const bearerToken =req.headers.authorization
    if(!bearerToken.startsWith("Bearer")) return res.status(403).send("bearer token must begin with 'bearer '")
    const token=bearerToken.split(" ")[1]
    let user;
    try{
        user=await verfiyaToken(token)

    }
    catch(err){
        return res.status(403).send(err.message)
    }
    req.user=user.user
    next()

}