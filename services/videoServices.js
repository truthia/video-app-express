const mysql=require ("mysql")
const dotenv = require ("dotenv");
const connection = require("../database");
dotenv.config()

let instance= null

class VideoServices {
    //dam bao tao ra chi 1 instance cuar Videoservices
    static getVideoServiceInstance(){
        return instance? instance: instance=new VideoServices();
    }
    async getAllVideo(){
        try {
            const respone= await new Promise((resolve,reject)=>{
                const query= "SELECT * FROM video LEFT JOIN category ON video.category=category.id ORDER BY video.id DESC;"
                connection.query(query,(err,results)=>{
                    if(err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return respone
        } catch (error) {
            console.log(error)
        }
    }
    async getVideoByTitle(title){
        try {
            const respone= await new Promise((resolve,reject)=>{
                const query= "SELECT * FROM video LEFT JOIN category ON video.category=category.id WHERE video.title = ? ORDER BY video.id DESC;"
                connection.query(query,[title],(err,results)=>{
                    if(err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return respone
        } catch (error) {
            console.log(error)
        }
    }
    async getVideoByCategory(category){
        try {
            const respone= await new Promise((resolve,reject)=>{
                const query= "SELECT * FROM video LEFT JOIN category ON video.category=category.id WHERE category.category_name = ? ORDER BY video.id DESC;"
                connection.query(query,[category],(err,results)=>{
                    if(err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return respone
        } catch (error) {
            console.log(error)
        }
    }
    
    async getAllVideoTags(videoId){
        try {
            const respone = await new Promise((resolve, reject)=>{
                const query="SELECT tag.tag_name FROM videos-tags LEFT JOIN tag ON videos-tags.tag-id=tag.id WHERE videos-tags.video-id= ?"
                connection.query(query,[videoId],(err, results)=>{
                    if(err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return respone
        } catch (error) {
            console.log(error)
        }
    }
    async insertNewRow(title,category, src, thumbnail,description){
        try {
            const insertId= await new Promise((resolve, reject)=>{
                const query="INSERT INTO video (title,category, src, thumbnail, description) VALUES (?,?,?,?,?);"
                connection.query(query,[title,category,src,thumbnail,description],(err, result)=>{
                    if(err) reject(new Error(err.message))
                    resolve(result)
                })
            })
            return insertId
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports= VideoServices