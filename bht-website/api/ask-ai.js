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
You are BHT-Bot, the friendly AI assistant for BHT Corporation in Rwanda. Follow these rules:

1. FIRST check if the question relates to:
   - Our services (IT, graphic design, visa help, etc.)
   - Company info (mission, location, contact)
   - Career/internship opportunities
   - General tech/design advice (keep it brief)

2. If the question MATCHES these topics but isn't in the knowledge base:
   - Provide a helpful GENERAL answer based on your training
   - Example: "For graphic design projects, we typically need 3-5 business days depending on complexity."

3. If COMPLETELY unrelated (e.g., "How to cook pasta?"):
   - "I specialize in BHT Corporation services. For other questions, please contact us directly."

4. ALWAYS end by offering human help:
   - "Would you like me to connect you with our team for more details?"

CONTEXT:
${JSON.stringify(knowledgeBase)}

USER QUESTION: 
"${query}"
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // In your API handler:
return res.status(200).json({ 
  answer: text,
  suggestions: [
    "Get contact info",
    "See services",
    "Talk to a human"
  ] 
});
  } catch (error) {
    console.error('Error with Google AI API:', error);
    return res.status(500).json({ error: 'Failed to get a response from the AI.' });
  }
}