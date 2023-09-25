export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
}

export interface HighScore {
  name: string;
  score: number;
}
