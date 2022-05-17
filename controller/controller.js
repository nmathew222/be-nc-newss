const{
    fetchTopics
}= require("../model/model.js")

exports.getTopics= (req,res,next)=>{
    //console.log("inside get topics controller")
    fetchTopics()
    .then((topics)=>{
        //console.log(topics, "tt");
        res.status(200).send({topics})
    })
    .catch((err)=>{
        console.log(err)
    })
}