const {
  fetchArticlesById,
  patchVotes,
  fetchAllArticles,
  insertComments,
} = require("../model/articles.model");

exports.getArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateVotes = (req, res, next) => {
  const { article_id } = req.params;

  patchVotes(article_id, req.body.inc_votes)
    .then((results) => {
      res.status(200).send({ updatedVotes: results });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComments = (req, res,next) => {
  insertComments(req.body, req.params.article_id).then((comments) => {
    res.status(201).send({ comments });
  })
  .catch((err) => {
    next(err);
  });
};
