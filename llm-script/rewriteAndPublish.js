import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import { googleSearch } from "./googleSearch.js";
import { scrapeArticle } from "./scrapeArticle.js";
import { rewriteWithLLM } from "./llm.js";

// ✅ Backend URL (prod-safe)
const BACKEND_URL =
  process.env.BACKEND_URL ||
  "https://bv2-3byh.onrender.com/api/articles";

async function run() {
  // ✅ 1. Fetch latest article
  const { data: article } = await axios.get(`${BACKEND_URL}/latest`);

  // ✅ SAFETY CHECK (prevents crash)
  if (!article) {
    console.log("⚠️ No articles found in DB. Add one first.");
    return;
  }

  console.log("Fetched article:", article.title);

  // 2. Google search
  const links = await googleSearch(article.title);

  // 3. Scrape references (safe)
  const refContents = [];
  for (const link of links.slice(0, 2)) {
    try {
      const content = await scrapeArticle(link);
      refContents.push(content);
    } catch (err) {
      console.warn("Failed to scrape:", link);
    }
  }

  if (refContents.length === 0) {
    console.log("⚠️ No reference content scraped. Aborting.");
    return;
  }

  // 4. Rewrite with LLM
  const updatedContent = await rewriteWithLLM(
    article.content,
    refContents[0],
    refContents[1] || ""
  );

  // 5. Publish updated article
  await axios.post(`${BACKEND_URL}`, {
    title: article.title + " (Updated)",
    content: updatedContent,
    type: "updated",
    references: links
  });

  console.log("✅ Updated article published successfully");
}

run().catch((err) => {
  console.error("❌ Script failed:", err.message);
});
