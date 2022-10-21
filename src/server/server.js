const app=require("..//index")
const connect=require("..//config/db")
require("dotenv").config({path:"..//config.env"})


const port=process.env.PORT ||8000



app.listen(port,async ()=>{
    await connect()
    console.log("listening on port:-",`${port}`)
})