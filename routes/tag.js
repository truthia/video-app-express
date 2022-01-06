const express = require ("express")
const tagServices= require("../services/tagServices")

const tagRouter = express.Router();

//get all video by tag

tagRouter.get("/:tag", (req,res)=>{
    const tag= req.params.tag
    const db= tagServices.getTagServiceInstancce();
    db.getVideosByTag(tag).then(data=>res.json({data:data})).catch(err=>console.log(err))
})

module.exports= tagRouter

