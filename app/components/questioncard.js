"use client";
import { useQuizStore } from "../store/quizestore";

export default function QuestionCard() {
  const {
    questions,
    currentQuestion,
    answers,
    score,
    saveAnswer,
    setQuestionNumber,
    setScore,
    finishQuiz,
  } = useQuizStore();

  const currentData = questions[currentQuestion];

  function nextQuestion() {
    if (answers[currentQuestion] === currentData.correctAnswer) {
      setScore(score + 1);
    }

  
    if (currentQuestion === questions.length - 1) {
      finishQuiz();
    } else {
      setQuestionNumber(currentQuestion + 1);
    }
  }

  return (
    <div>
      <p className="text-sm mb-1 text-white">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <h2 className="text-lg text-white font-semibold mb-4">
        {currentData.question}
      </h2>

      <div>
        {currentData.options.map((option, index) => {
          const selected = answers[currentQuestion] === index;

          return (
            <button
              key={index}
              onClick={() => saveAnswer(index)}
              className={
                "w-full p-3 mb-2 text-left " +
                (selected
                  ? "bg-[#393E46] text-white"
                  : "bg-[#EEEEEE] text-black hover:bg-black hover:text-white")
              }
            >
              {option}
            </button>
          );
        })}
      </div>
      <button
        onClick={nextQuestion}
        className="mt-4 w-full bg-[#00ADB5] hover:bg-black text-white p-3"
      >
        Next Question
      </button>
    </div>
  );
}
