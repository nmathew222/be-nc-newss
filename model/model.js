const db= require("../db/connection.js")

exports.fetchTopics= ()=>{
    //console.log("inside fetch topics model")
    return db.query(`SELECT * FROM topics;`).then((results)=>{
        //console.log(results.rows);
        return results.rows;

    })
}