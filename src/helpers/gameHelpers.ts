import { Difficulty, HighScore, Question } from "../types/gameTypes"

export const defaultQuestion: Question = {
    category: "",
    type: "",
    difficulty: "",
    question: "Loading question...",
    correct_answer: "",
  };

export const getStoredDifficulty = () => {
    const storedDifficulty = localStorage.getItem("difficulty");
    if (storedDifficulty) {
        switch (storedDifficulty) {
            case("easy"): {
                return Difficulty.Easy
            }
            case("medium"): {
                return Difficulty.Medium
            }
            case("hard"): {
                return Difficulty.Hard
            }
        }
    }
    return
}

export const getStoredHighScores = () => {
    const storedHighScore = localStorage.getItem("highScore");
    if(storedHighScore) {
        return JSON.parse(storedHighScore) as HighScore[]
    }
    return
}