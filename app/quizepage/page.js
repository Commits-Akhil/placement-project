"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function QuizePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to quiz page since this appears to be unused
    router.push("/quiz");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5]">
      <div className="text-[#EEEEEE] text-xl">Redirecting...</div>
    </div>
  );
}
