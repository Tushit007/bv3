import mongoose from "mongoose";
import Article from "../models/Article.js";
import express from "express";
import {
  getArticles,
  getLatestArticle,
  createArticle
} from "../controllers/articleController.js";

const router = express.Router();


router.get("/", getArticles);
router.get("/latest", getLatestArticle);
router.post("/", createArticle);
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  // ✅ PREVENT MongoDB crash
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid article ID" });
  }

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (err) {
    console.error("Fetch article error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
