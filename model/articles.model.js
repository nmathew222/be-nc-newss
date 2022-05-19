const db= require("../db/connection.js")

exports.fetchArticlesById= (article_id)=>{
    return db.query("SELECT articles.*,COUNT(comments.comment_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE comments.article_id = $1 GROUP BY articles.article_id;",[article_id]).then((results)=>{
        console.log(results);
        if(results.rows.length===0){  
            return Promise.reject({status:404,msg:'not found'})
        }
        return results.rows[0]
    })
}
exports.patchVotes= (article_id,votes)=>{
    
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

