import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeJobs(prompt, apiKey = null) {
  console.log("Gemini function called");

  const key = apiKey || process.env.GEMINI_API_KEY;
  
  if (!key) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const genAI = new GoogleGenerativeAI(key);

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash'
  });

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  console.log("RAW GEMINI RESPONSE:", text);

  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");

  if (start === -1 || end === -1) {
    throw new Error("Gemini did not return JSON array");
  }

  const jsonText = text.slice(start, end + 1);
  return JSON.parse(jsonText);
}
