const express= require("express")
const {
    getTopics
} = require("./controller/controller.js")

const app= express();


app.get("/api/topics", getTopics)

app.use('/*',(req,res,next)=>{
    res.status(404).send({msg: "NOT FOUND"});
})




module.exports=app;




