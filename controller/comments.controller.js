const{
    fetchComments
}= require("../model/comments.model")

exports.getComments= (req,res,next)=>{
    const {article_id}= req.params;
    fetchComments(article_id).then((comments)=>{
        res.status(200).send({comments})
    }).catch((err)=>{
        next(err)


    })
}
