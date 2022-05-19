const {
    fetchArticlesById,
    patchVotes,
    
}= require("../model/articles.model")

exports.getArticlesById= (req,res,next)=>{
    console.log("inside controlerrrrrrr");
    const {article_id}= req.params;
    fetchArticlesById(article_id).then((article)=>{
        res.status(200).send({article})
    }).catch((err)=>{
        console.log(err);
        next(err)


    })
}




exports.updateVotes= (req,res, next) =>{
    
    const {article_id}= req.params;
    
    patchVotes(article_id,req.body.inc_votes).then((results)=>{
        
        res.status(200).send({updatedVotes: results})
    }).catch((err)=>{
        next(err)
    })
}




