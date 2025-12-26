import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeArticle(url) {
  const { data } = await axios.get(url, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);

  // Try common article containers
  const content =
    $("article").text() ||
    $("main").text() ||
    $("body").text();

  return content.replace(/\s+/g, " ").trim().slice(0, 4000);
}
