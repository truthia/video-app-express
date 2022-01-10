const mysql= require ("mysql")
const dotenv= require ("dotenv")
const connection = require("../database")

let instance=null 

class TagService{
    static getTagServiceInstancce(){
        return instance? instance: instance=new TagService()
    }
    async getVideosByTag(tag){
        try {
            const respone= await new Promise((resolve,reject)=>{
                const query="SELECT * FROM video LEFT JOIN category ON video.category=category.id LEFT JOIN videos-tags ON video.id=videos-tags.video-id LEFT JOIN tag ON videos-tags.tag-id=tag.id WHERE tag.tag_name=?;"
                connection.query(query,[tag],(err,results)=>{
                    if(err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return respone
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports= TagService