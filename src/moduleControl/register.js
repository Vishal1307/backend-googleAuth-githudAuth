const express=require('express');
const router=express.Router();
const User=require("..//module/user")
const {body,validationResult}=require("express-validator")
const formatError = require("..//utlies/valdation")
const jwt=require("jsonwebtoken")
// const privateKey="abcdefghijklmnopqrst"
require("dotenv").config({path:'..//config.env'})
const newToken=(user)=>{
    return jwt.sign({user:user,exp: Math.floor(Date.now() / 1000) + (60 * 60)},process.env.PRIVATE_KEY)

}

router.post("",body("email").isEmail(),body("password").isLength({min:5}).withMessage("password must be greater than 5"),
    

async (req,res)=>{
    try{
        const error=validationResult(req)
        
        if(!error.isEmpty()){
            return res.status(400).send({error:formatError(error.array())})

        }
        let user=await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(404).send("email is already in use")
        }
        user=await User.create(req.body)
        const token=newToken(user)

        return res.status(200).send({user,token})

    }
    catch(err){
        return res.status(200).send({message:err.message});
    }
})
router.get("",async (req,res)=>{
    let user=await User.find().lean().exec()
    return res.status(200).send({user})
})
module.exports=router