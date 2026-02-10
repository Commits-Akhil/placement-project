"use client";
import { useEffect, useState } from "react";
import QuestionCard from "../components/questioncard";
import { useQuizStore } from "../store/quizestore";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const { questions, score, answers, isSubmitted, setQuestions } =
    useQuizStore();

  async function startQuiz() {
    const res = await fetch("/api/quiz");
    const data = await res.json();

    setQuestions(data);
    setStarted(true);
  }

  useEffect(() => {
    if (isSubmitted) {
      sendToAI();
    }
  }, [isSubmitted]);

  async function sendToAI() {
    setLoading(true);

    const result = {
      score: score,
      total: questions.length,
      questions: questions.map((q, index) => ({
        question: q.question,
        selectedAnswer: q.options[answers[index]],
        correctAnswer: q.options[q.correctAnswer],
        category: q.category,
        isCorrect: answers[index] === q.correctAnswer,
      })).filter(q => !q.isCorrect),
    };

    const res = await fetch("/api/quiz-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    });

    const data = await res.json();
    setAiFeedback(data.feedback);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#222831] via-[#393E46] to-[#00ADB5]">
      <div className=" p-6 w-[420px]">
        {!started ? (
          <>
            <h2 className="text-2xl font-bold mb-2 text-white text-center">
              Test Your Knowledge
            </h2>

            <p className="mb-5 text-center text-gray-400 text-sm">
              Answer the questions and get personalized AI feedback.
            </p>
            <div className="mb-6 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="p-2 bg-gray-100 rounded">
                <p className="font-semibold text-black">15</p>
                <p className="text-gray-500">Questions</p>
              </div>

              <div className="p-2 bg-gray-100 rounded">
                <p className="font-semibold text-black">No</p>
                <p className="text-gray-500">Time Limit</p>
              </div>

              <div className="p-2 bg-gray-100 rounded">
                <p className="font-semibold text-black">AI</p>
                <p className="text-gray-500">Feedback</p>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="w-full bg-[#222831] text-white p-3"
            >
              Start Quiz 🚀
            </button>
          </>
        ) : !isSubmitted ? (
          <QuestionCard />
        ) : (
          <div className="text-center">
            <h2 className="text-xl text-white font-bold">Quiz Finished</h2>

            <p className="mt-2 text-white">
              Your Score: {score} / {questions.length}
            </p>

            {loading && (
              <p className="mt-3 text-gray-500">
                AI is checking your answers...
              </p>
            )}

            {aiFeedback && (
              <div>
                <div className="mt-6 bg-white rounded-xl shadow-lg p-5 text-left">
                  <p className="mt-3 text-sm mb-6 text-black">
                    {score / questions.length >= 0.6
                      ? "Nice work! Here’s how you can improve further 👏"
                      : "Don’t worry — learning is a process. Here’s some guidance 💡"}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">🤖</span>
                    <h3 className="font-semibold text-black text-lg">AI Coach Feedback</h3>
                  </div>

                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {aiFeedback}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
