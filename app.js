const express = require("express");
const cors = require("cors");

const { getTopics } = require("./controller/controller.js");
const {
  getArticlesById,
  updateVotes,
  getAllArticles,
  postComments,
} = require("./controller/articles.controller");
const { getUsers } = require("./controller/users.controller.js");
const { getComments,deleteComment } = require("./controller/comments.controller");
const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticlesById);
app.get("/api/articles", getAllArticles);
app.patch("/api/articles/:article_id", updateVotes);
app.get("/api/users", getUsers);
app.get("/api/articles/:article_id/comments", getComments);
app.post("/api/articles/:article_id/comments", postComments);
app.delete("/api/comments/:comment_id", deleteComment)

app.use("/*", (req, res, next) => {
  res.status(404).send({ msg: "not found" });
});
app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502" || err.code === "23503") {
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

module.exports = app;
