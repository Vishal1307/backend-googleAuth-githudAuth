const formatError=(errorOfArray)=>{
    return errorOfArray.map((err)=>{
        return {
            message:err.msg,
            location:err.location,
            param:err.param
        
            
        }
    })
}
module.exports = formatError