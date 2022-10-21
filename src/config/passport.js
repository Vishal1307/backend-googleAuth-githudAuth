var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const User = require('../module/user');
const { v4: uuidv4 } = require('uuid')
const jwt=require("jsonwebtoken")
const GitHubStrategy = require('passport-github').Strategy
require("dotenv").config({path:"..//config.env"})
const newToken=(user)=>{
    return jwt.sign({user:user},process.env.PRIVATE_KEY)
}

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/callback"
  },
  
 async function(accessToken, refreshToken, profile, cb) {
    let user=await User.findOne({email:profile._json.email}).lean().exec()
    if(!user){
        user=await User.create({name:"",email:profile._json.email,password:uuidv4()})
    }
    else{
      user={
        name:profile._json.name,
        email:profile._json.email,
        profile_pic:profile._json.picture
      }
    }
    const token=newToken(user)
    

    return cb(null,{token,user})

  }
));
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    let user=await User.findOne({email:profile._json.login}).lean().exec()
    if(!user){
        user=await User.create({email:profile._json.login,password:uuidv4()})
    }
    const token=newToken(user)

    return cb(null,{token,user})
  }
));
module.exports =passport