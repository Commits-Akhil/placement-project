"use client";
import { useState } from "react";

export default function Opportunities() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/recommend-jobs", {
        method: "POST"
      });

      if (!res.ok) {
        throw new Error("AI failed");
      }

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      alert("AI could not generate jobs. Try again.");
    } finally {
      setLoading(false);
    }
  };

const getApplyLink = (job) => {
  const domainSource = job.domain || job.title || "";

  const domainSlug = domainSource
    .toLowerCase()
    .replace(/\s+/g, "-");

  if (job.platform === "Internshala") {
    return `https://internshala.com/internships/${domainSlug}-internship`;
  }

  if (job.platform === "LinkedIn") {
    return `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
      job.title || ""
    )}`;
  }

  if (job.platform === "Indeed") {
    return `https://www.indeed.com/jobs?q=${encodeURIComponent(
      job.title || ""
    )}`;
  }

  return "#";
};



  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">
        Job & Internship Recommendations
      </h1>

      <button
        onClick={getRecommendations}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Get Recommendations
      </button>

      {loading && <p className="mt-4">AI is thinking...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {jobs.map((job, i) => (
          <div key={i} className="border p-4 rounded">
            <h2 className="font-semibold">{job.title}</h2>
            <p>{job.type}</p>
            <p className="text-sm">
              Skills: {job.skills.join(", ")}
            </p>
            <a
              href={getApplyLink(job)}
              target="_blank"
              className="text-blue-600 underline"
            >
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
