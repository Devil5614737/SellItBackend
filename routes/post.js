const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const Post=require('../models/post');


router.post('/',auth,async(req,res)=>{
const {title,desc,price,image,longitude,latitude}=req.body;
const newPost= new Post({
    title,desc,price,image,longitude,latitude,
    postedBy:req.user
})
try {
    const post = await newPost.save();
    res.status(200).json(post);

} catch (e) {
    console.log(e);
}

})


router.get('/allPost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id fullname email pic")

 
    .then((posts)=>{
        res.json({posts})
    }).catch(err=>{
        console.log(err)
    })
})


router.get('/myPost',auth,async(req,res)=>{

    const  posts=await Post.find({postedBy:req.user._id}).populate('postedBy','_id fullname email pic')
    try{
        res.status(200).json(posts)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports=router;