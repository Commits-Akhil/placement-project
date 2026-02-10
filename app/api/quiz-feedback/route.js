import { NextResponse } from "next/server";

export async function POST(req) {

  const data = await req.json();

 
  const score = data.score;
  const total = data.total;
  const wrongQuestions = data.questions;

 
  const message =
    "The student scored " +
    score +
    " out of " +
    total +
    " questions.\n\n" +
    "Below are the questions the student answered incorrectly:\n" +
    JSON.stringify(wrongQuestions, null, 2) +
    "\n\n" +
    "Based on these mistakes, give simple and practical advice.\n" +
    "Focus on weak topics and patterns.\n" +
    "Write in a friendly teacher tone.\n" +
    "Do not use bullet points.\n" +
    "Limit the response to 200 words.";


  const apiKey = process.env.GEMINI_API_KEY;
  const model = "gemini-2.5-flash";

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/" +
      model +
      ":generateContent?key=" +
      apiKey,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      }),
    }
  );


  const result = await response.json();

  return NextResponse.json({
    feedback: result.candidates[0].content.parts[0].text,
  });
}
