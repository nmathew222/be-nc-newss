const db= require("../db/connection.js")

exports.fetchArticlesById= (article_id)=>{
    return db.query("SELECT * FROM articles WHERE article_id= $1",[article_id]).then((results)=>{
        if(results.rows.length===0){  
            return Promise.reject({status:404,msg:'not found'})
        }
        return results.rows[0]
    })
}
exports.patchVotes= (article_id,votes)=>{
    console.log(votes)
    return db.query("UPDATE articles SET votes=votes+$1 WHERE article_id=$2 RETURNING *",
        [votes, article_id]
        )
        .then((results)=>{
            if(results.rows.length===0){  
                return Promise.reject({status:404,msg:'not found'})
            }
            return results.rows[0];
        
    })
}

