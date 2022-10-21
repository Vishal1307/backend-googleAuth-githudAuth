const mongoose = require('mongoose');
require("dotenv").config({path:"..//config.env"})

const db=process.env.db
module.exports=()=>{
    return mongoose.connect(db,{
        useNewUrlParser: true,
        useUnifiedTopology: true,

        
    }).then(()=>console.log("Connected to MongoDB")).catch(()=>console.log("Failed to connect to MongoDB"))
}