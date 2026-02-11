import { analyzeJobs } from "../../lib/gemini";

// Counter to alternate between API keys
let requestCount = 0;

export async function POST() {
  try {
    console.log("API HIT: recommend-jobs");

    // Alternate between two API keys for load balancing
    const apiKey1 = process.env.GEMINI_API_KEY_1;
    const apiKey2 = process.env.GEMINI_API_KEY_2;
    
    if (!apiKey1 || !apiKey2) {
      throw new Error("Both API keys must be configured");
    }
    
    // Use key 1 for even requests, key 2 for odd requests
    const selectedKey = (requestCount % 2 === 0) ? apiKey1 : apiKey2;
    requestCount++;
    
    console.log(`Using API key ${requestCount % 2 === 0 ? '2' : '1'} for this request`);

    const studentProfile = {
      skills: ["React", "JavaScript", "Firebase"],
      role: "Web Developer",
      resumeScore: 70,
      skillGaps: ["Advanced DSA"]
    };

    const prompt = `
You are a strict JSON API.

TASK:
Recommend atmost 6 job or internship roles.

STUDENT PROFILE:
Skills: ${studentProfile.skills.join(", ")}
Target Role: ${studentProfile.role}
Resume Score: ${studentProfile.resumeScore}
Skill Gaps: ${studentProfile.skillGaps.join(", ")}

RULES:
- ONLY JSON
- No explanation
- No markdown
- JSON array only

FORMAT:
[
  {
    "title": "string",
    "type": "Job or Internship",
     "skills": ["string"],
    // "link": "https://example.com"
    "domain": "Web Development | Data Science | Java | Python | React",
    "platform": "Internshala | LinkedIn | Indeed"
  }
]
`;

    const jobs = await analyzeJobs(prompt, selectedKey);

    console.log("AI JOBS:", jobs);

    return Response.json(jobs);
  } catch (error) {
    console.error("API ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
