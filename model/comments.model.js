const db= require("../db/connection.js")






exports.fetchComments= (article_id)=>{
    return db.query('SELECT comments.* FROM comments WHERE comments.article_id=$1',[article_id]).then((results)=>{
        if(results.rows.length===0){  
            return Promise.reject({status:404,msg:'not found'})
        }
        return results.rows
    })
}