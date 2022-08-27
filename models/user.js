const mongoose=require('mongoose');



const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:55
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:1200
    },
    pic:{
        type:String,
        default:'https://images.unsplash.com/photo-1639689413104-82dbbd1db74d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60'
    },
    expoSecretToken:{
      type:String
    }
})



userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.PRIVATE_KEY)
    return token
}



const User=mongoose.model('User',userSchema);
module.exports=User;