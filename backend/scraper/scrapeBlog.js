import axios from "axios";
import * as cheerio from "cheerio";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Article from "../models/Article.js";

dotenv.config();

console.log("🚀 Scraper started...");

const scrapeBlogs = async () => {
  try {
    // ✅ CONNECT TO MONGODB
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    console.log("🌐 Fetching blogs page...");
    const { data } = await axios.get("https://beyondchats.com/blogs/");
    console.log("📄 Page fetched, HTML length:", data.length);

    const $ = cheerio.load(data);
    const blogs = [];

    $("a").each((_, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr("href");

      if (title.length > 40 && href && href.includes("/blogs/")) {
        blogs.push({
          title,
          content: title,
          sourceUrl: href.startsWith("http")
            ? href
            : `https://beyondchats.com${href}`,
          type: "original",
        });
      }
    });

    console.log("📰 Blogs found:", blogs.length);

    const uniqueBlogs = blogs
      .filter(
        (blog, index, self) =>
          index === self.findIndex(b => b.title === blog.title)
      )
      .slice(0, 5);

    for (const blog of uniqueBlogs) {
      await Article.create(blog);
      console.log("✅ Saved:", blog.title);
    }

    console.log("🎉 Scraping completed successfully");
  } catch (error) {
    console.error("❌ Scraping failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected");
    console.log("✅ Scraper finished");
    process.exit(0);
  }
};

scrapeBlogs();
