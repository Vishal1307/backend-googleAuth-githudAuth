const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{type:String, required:true, default:null},
    email:{type:String, required:true, default:null},
    password:{type:String, required:true, default:null},
    // confrom_password:{type:String, required:true, default:null},
    // role:[{type:String, required:true, default:null}],
    // address:{type:String, required:true, default:null},
    // phone:{type:Number, required:true, default:null},
    // profile_pic:{type:String, required:true, default:null},


},{
    timeseries:true,
    versionKey:false
    
})
userSchema.pre("save",function (next){
    if(!this.isModified('password')) return next()
    this.password=bcrypt.hashSync(this.password,bcrypt.genSaltSync(8))
    return next()


})
userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password,this.password)

}
module.exports=mongoose.model('User', userSchema)