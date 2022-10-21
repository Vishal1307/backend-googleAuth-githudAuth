const express=require('express');
const router=express.Router()
const User=require("..//module/user")
const jwt=require("jsonwebtoken")
const {body,validationResult}=require("express-validator")
const formatError=require("..//utlies/valdation")
require("dotenv").config({path:"..//config.env"})

const newToken=(user)=>{
    return jwt.sign({user:user},process.env.PRIVATE_KEY)
}
router.post("",body("email").notEmpty().isEmail(),async (req,res)=>{
    try{

        let user=await User.findOne({email:req.body.email})
        const error=validationResult(req)
        if(!error.isEmpty()){
            return res.status(404).send({error:formatError(error.array())})
        }
        if(!user){
            return res.status(404).send("email is not exist")
        }
        let match=user.checkPassword(req.body.password)
        if(!match){
            return res.status(404).send("please check your password")
        }
        const token=newToken(user)
        return res.status(200).send({token,user})


    }
    catch(err){
        return res.status(404).send({message: err.message});
    }
} )
router.get("",async (req,res)=>{
    try{
        let user=await User.find(req.body).lean().exec()
        return res.status(200).send({user})

    }
    catch(err){
        return res.status(404).send({message: err.message});
    }

})









module.exports=router