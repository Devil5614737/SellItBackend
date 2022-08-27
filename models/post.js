const mongoose=require('mongoose');
const {ObjectId} = mongoose.Schema.Types;


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    longitude:{
        type:Number,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Post=mongoose.model("Post",postSchema);

module.exports=Post