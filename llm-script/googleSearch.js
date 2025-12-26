import axios from "axios";
import * as cheerio from "cheerio";

export async function googleSearch(query) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  });

  const $ = cheerio.load(data);
  const links = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("/url?q=")) {
      const cleanUrl = href.split("/url?q=")[1].split("&")[0];
      if (cleanUrl.startsWith("http")) {
        links.push(cleanUrl);
      }
    }
  });

  // Return first 2 unique blog-like links
  return [...new Set(links)].slice(0, 2);
}
