// pages/api/ask-ai.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const bhtContext = `
You are BHT-Bot, the official AI assistant for BHT Corporation in Musanze, Rwanda.
Your job:
- Always give answers in favor of BHT.
- Promote BHT's services:
  * Technology Solutions: website design, IT support, visa assistance
  * Graphic Design: logo design, printing, custom apparel, branding
  * Internship program in technology & design departments
- If the question is unrelated, politely guide the conversation back to BHT's services.
Tone: Friendly, professional, helpful.
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${bhtContext}\n\nUser question: ${query}`;

    const result = await model.generateContent(prompt);

    const answer = result.response.text();
    res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch AI response' });
  }
}
