const express=require('express')
const app = express();
const register=require("./moduleControl/register")
const login=require("./moduleControl/login")
const passport=require("./config/passport")
const session = require('express-session')

app.use(express.json())
app.use("/register",register)
app.use("/login",login)
app.use(passport.initialize())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

passport.serializeUser(function({token,user},cb){
    // console.log("2",token,user)
    cb(null,{token,user})
})
passport.deserializeUser(function(user,cb){
    cb(null,user)
})
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
   
    res.status(200).send({user:req.user.user,token:req.user.token})

  });
  app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.status(200).send({user:req.user.user,token:req.user.token})
  });



module.exports = app