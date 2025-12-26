import Article from "../models/Article.js";

export const getArticles = async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
};

export const getLatestArticle = async (req, res) => {
  const article = await Article.findOne().sort({ createdAt: -1 });
  res.json(article);
};

export const createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  res.json(article);
};
