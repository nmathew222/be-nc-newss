const express= require("express")
const {
    getTopics,
    
} = require("./controller/controller.js")
const {
    getArticlesById
}= require("./controller/articles.controller")

const app= express();


app.get("/api/topics", getTopics)
app.get("/api/articles/:article_id", getArticlesById)

app.use('/*',(req,res,next)=>{
    res.status(404).send({msg: "not found"});
});
app.use((err, req, res, next) => {
    
    if (err.code === "22P02") {
      res.status(400).send({ msg: "bad request" });
    } else {
      next(err);
    }
  });
  app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  });
  
  app.use((err, req, res, next) => {
    res.status(500).send({ msg: "server error" });
  });


module.exports=app;
