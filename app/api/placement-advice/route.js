import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, age, jobRole, skills, languages, experience, projects } = body;

    // Using GEMINI_API_KEY (Key 1) for placement advice
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: 'API key not configured. Please add GEMINI_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are an expert career advisor specializing in campus placements and job preparation. 

Candidate Profile:
- Name: ${name}
- Age: ${age}
- Target Job Role: ${jobRole}
- Skills: ${skills}
- Languages: ${languages}
- Experience: ${experience}
- Projects: ${projects}
In human way, tell in less than 400 words, how this candidate can best prepare for their target job role. Provide specific advice on:
1. Key areas to focus on based on their profile
2. Recommended resources (courses, books, websites)
3. Interview preparation tips
4. Any additional advice to improve their chances of success in placements. also dont use * in output.write it in 2 ro 3 paragraphs.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();

    return Response.json({ advice }, { status: 200 });
  } catch (error) {
    console.error('Error generating advice:', error);
    return Response.json(
      { error: error.message || 'Failed to generate advice' },
      { status: 500 }
    );
  }
}
