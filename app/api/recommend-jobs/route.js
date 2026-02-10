import { analyzeJobs } from "../../lib/gemini";


export async function POST() {
  try {
    console.log("API HIT: recommend-jobs");

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

    const jobs = await analyzeJobs(prompt);

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
