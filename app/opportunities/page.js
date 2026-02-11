"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Opportunities() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('isAuthenticated');
    if (!isAuth || isAuth !== 'true') {
      router.push('/Login');
      return;
    }
    setIsLoading(false);
  }, [router]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] flex items-center justify-center">
        <div className="text-[#EEEEEE] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5] p-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#EEEEEE] rounded-3xl shadow-2xl p-8">
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#222831] mb-2">
                Job & Internship Recommendations
              </h1>
              <p className="text-[#393E46]">
                Get AI-powered job recommendations tailored to your profile
              </p>
            </div>
            <button
              onClick={() => router.push('/profile')}
              className="bg-[#393E46] text-[#EEEEEE] px-4 py-2 rounded-lg font-semibold hover:bg-[#222831] transition-colors text-sm"
            >
              ← Profile
            </button>
          </div>

          <button
            onClick={getRecommendations}
            disabled={loading}
            className="w-full mb-6 bg-[#00ADB5] text-[#EEEEEE] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#222831] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "AI is analyzing..." : "Get Recommendations "}
          </button>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ADB5]"></div>
              <p className="mt-4 text-[#393E46] font-medium">AI is generating personalized recommendations...</p>
            </div>
          )}

          {!loading && jobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-[#393E46]">
              <p className="text-[#393E46] text-lg">Click the button above to get personalized job recommendations</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <div key={i} className="bg-white border border-[#393E46] p-6 rounded-lg hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold text-[#222831] mb-2">{job.title}</h2>
                <div className="mb-3">
                  <span className="inline-block bg-[#00ADB5] text-[#EEEEEE] px-3 py-1 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                  {job.platform && (
                    <span className="inline-block ml-2 bg-[#393E46] text-[#EEEEEE] px-3 py-1 rounded-full text-sm font-medium">
                      {job.platform}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#393E46] mb-4">
                  <strong className="text-[#222831]">Skills:</strong> {job.skills.join(", ")}
                </p>
                <a
                  href={getApplyLink(job)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-[#222831] text-[#EEEEEE] px-4 py-2 rounded-lg font-semibold hover:bg-[#00ADB5] transition-colors"
                >
                  Apply Now →
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
