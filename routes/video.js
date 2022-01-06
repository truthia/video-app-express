const express = require("express")
const dbService= require("../services/videoServices")

const videoRouter= express.Router();


//get all video
videoRouter.get("/",(req,res)=>{
    const db=dbService.getVideoServiceInstance();
    const result= db.getAllVideo()
    result.then(dt=>res.json({data:dt})).catch(err => console.log(err));
})
//add video
videoRouter.post("/add",(req,res)=>{
    const {title,category,src,thumbnail,description}=req.body
    const db=dbService.getVideoServiceInstance();
    const result=db.insertNewRow(title,category,src,thumbnail,description)
    result.then(data=> {
        res.json({data:data})
    }).catch(err=>console.log(err))
})
//get video by title
videoRouter.get("/title/:title",(req,res)=>{
    const title= req.params.title
    const db = dbService.getVideoServiceInstance();
    db.getVideoByTitle(title).then(data=>res.json({data:data})).catch(err=>console.log(err))
})
//get video by category
videoRouter.get("/category/:category",(req,res)=>{
    const category= req.params.category
    const db = dbService.getVideoServiceInstance();
    db.getVideoByCategory(category).then(data=>res.json({data:data})).catch(err=>console.log(err))
})
//get tags of a video by id
videoRouter.get("/videoId/:videoId",(req,res)=>{
    const videoId = req.params.videoId
    const db= dbService.getVideoServiceInstance();
    db.getAllVideoTags(videoId).then(data=>res.json({data:data})).catch(err=>console.log(err))
})
module.exports = videoRouter