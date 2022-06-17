const db = require("../db/connection.js");
const { fetchArticlesById } = require("./articles.model.js");

exports.fetchComments = (article_id) => {
  return db
    .query("SELECT comments.* FROM comments WHERE comments.article_id=$1", [
      article_id,
    ])
    .then((results) => {
      
      if (results.rows.length === 0) {
        return fetchArticlesById(article_id);
      }else{
      return results.rows;
      }
    })
    .then((results) => { 
        if(Array.isArray(results)){

      return results;
        } else{
            return []
        }
    });
};

exports.removeComment= (comment_id)=>{
  console.log(comment_id);
  return db.query("DELETE FROM comments WHERE comment_id=$1 RETURNING *",[comment_id])
  .then((results)=>{
    console.log(results.rows.length);
    if(results.rows.length===0){
      return Promise.reject({status: 404, msg: "not found"})
    }else return results
  })
}