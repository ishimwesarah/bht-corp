import { GoogleGenerativeAI } from '@google/generative-ai';
import { knowledgeBase } from '../src/data/knowledgeBase.js';


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // --- The professional "Prompt Engineering" ---
    const prompt = `
      You are a friendly and professional AI assistant for a company called BHT Corporation in Rwanda.
      Your name is BHT-Bot.
      Your ONLY job is to answer the user's question based STRICTLY on the context provided below.
      Do not use any outside knowledge.
      If the question is unrelated to the context, politely state that you can only answer questions about BHT Corporation's services, mission, or contact information.
      Keep your answers concise and helpful.

      CONTEXT:
      ${JSON.stringify(knowledgeBase)}

      USER'S QUESTION:
      "${query}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ answer: text });
  } catch (error) {
    console.error('Error with Google AI API:', error);
    return res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
}