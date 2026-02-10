import { create } from "zustand";

export const useQuizStore = create((set) => ({
  
  questions: [],
  currentQuestion: 0,
  answers: {},
  score: 0,
  isSubmitted: false,

  setQuestions: (questions) => {
    set({
      questions: questions,
      currentQuestion: 0,
      answers: {},
      score: 0,
      isSubmitted: false,
    });
  },

  
  saveAnswer: (optionIndex) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [state.currentQuestion]: optionIndex,
      },
    }));
  },

  
  setQuestionNumber: (number) => {
    set({
      currentQuestion: number,
    });
  },

  
  setScore: (value) => {
    set({
      score: value,
    });
  },


  finishQuiz: () => {
    set({
      isSubmitted: true,
    });
  },
}));
