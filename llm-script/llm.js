import axios from "axios";

export async function rewriteWithLLM(original, ref1, ref2) {
  const prompt = `
You are a technical content editor.

TASK:
Rewrite the original article to improve clarity, structure, and formatting,
taking inspiration from the reference articles.

RULES:
- Do NOT copy sentences
- Preserve original meaning
- Use headings and subheadings
- Make content more professional
- Add a "References" section at the end

ORIGINAL ARTICLE:
${original}

REFERENCE ARTICLE 1:
${ref1}

REFERENCE ARTICLE 2:
${ref2}
`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LLM_API_KEY}`
      }
    }
  );

  return response.data.choices[0].message.content;
}
