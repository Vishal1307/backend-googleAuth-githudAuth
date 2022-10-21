const multer=require('multer')
const path = require('path')

const storge=multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,"..//upload"))

    },
    __filename:function (req,file,cb){
        cb(null,Date.now()+"_"+file.originalName)
    }
})
const fileType=(req,file,cb)=>{
    if(file.mimetype==="image/jpeg" || file.mimetype==="image/png" || file.mimetype==="image/gif" || file.mimetype==="image/jpg"){
        cb(null,true)
    }
    else{
        cb(null,false)
    }

}
const upload=multer({
    storage:storge,
    fileFilter: fileType,
    limits:{
        fileSize:1024*1024*5
    }
})
const uploadSingle=(fileName)=>{
    return (req,res,next)=>{
        const uploadItem=upload.single(fileName)
        uploadItem(req,res,function(err){
            if(err instanceof multer.MulterError){
                return res.status(400).send({message:err.message,errorType:"MulterError"})
                
            }
            else if(err){
                return res.status(400).send({message:err.message,errorType:"NormalError"})

            }
            next()
        })
    }

}
const uploadMultiple=(fileCount,fileName)=>{
    return (req,res,next)=>{
        const uploadItem=upload.array(fileCount,fileName)
        uploadItem(req,res,function(err){
            if(err instanceof multer.MulterError){
                return res.status(400).send({message:err.message,errorType:"MulterError"})


            }
            else if(err){
                return res.status(400).send({message:err.message,errorType:"NormalError"})

            }
            next()

        })

    }
}
module.exports={uploadSingle,uploadMultiple}
