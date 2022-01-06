const express= require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const videoRouter = require("./routes/video");
const tagRouter= require("./routes/tag")

//thiet lap
const app=express();
dotenv.config();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use("/video",videoRouter)
app.use("/tag",tagRouter)

// server connecting
app.listen(process.env.PORT || 5000, console.log("server is running"))
 