const Joi = require('joi');
const jwt=require('jsonwebtoken');
const express=require('express');
const bcrypt=require('bcrypt');
const User=require('../models/user');
const router=express.Router();



router.post('/',async(req,res)=>{
    const {email,password}=req.body;
const error=Validate(req.body)

const newUser=new User({
    email,password
})

if(error) return res.status(400).send(error.details[0].message)

try{
    const user = await User.findOne({ email });

    if (user) {
      const validPassword = await bcrypt.compare(newUser.password, user.password);
  
      if (validPassword) {
        const token = jwt.sign({ _id: user._id,fullname:user.fullname,email:user.email,pic:user.pic,expoSecretToken:user.expoSecretToken},process.env.PRIVATE_KEY);
        res.status(200).json(token);
      } else {
        res.status(400).json("Invalid credentials");
      }
    } else if (!user) {
      res.status(400).json("Invalid credentials");
    }
  }
  catch(e){
      console.log(e)
  }
  


})



function Validate(obj){
  const schema=Joi.object({
    email:Joi.string().min(5).max(50).email(),
    password: Joi.string().min(5).max(500)
        ,
  });

const {error}=schema.validate(obj);
return error

}




module.exports=router;
