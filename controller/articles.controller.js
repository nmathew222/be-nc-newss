const {
    fetchArticlesById,
    patchVotes,
    fetchAllArticles,
    
}= require("../model/articles.model")

exports.getArticlesById= (req,res,next)=>{
    const {article_id}= req.params;
    fetchArticlesById(article_id).then((article)=>{
        res.status(200).send({article})
    }).catch((err)=>{
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


exports.getAllArticles= (req,res,next)=>{
    fetchAllArticles().then((articles)=>{
        res.status(200).send({articles})
    }).catch((err)=>{
        
        next(err)


    })
}

exports.postPark = (req,res) => {
    //console.log(req.body, "req.body cl");
    insertPark(req.body).then((park)=>{
     // console.log(park, "consolelog park");
      res.status(201).send({park})