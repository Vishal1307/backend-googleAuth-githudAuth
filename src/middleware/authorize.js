module.exports=(permittedRole)=>{
    return (req,res,next)=>{
        let user=req.user
        let isAllowed=false
        for(let i=0;i<user.role.length;i++){
            if(permittedRole.includes(user.role[i])){
                isAllowed=true
                break
            }

        }
        if(isAllowed){
            next()
        }
        else{
            return res.status(403).send("permission denied")
        }
    }

}