import axios from "axios";
import { Difficulty, Question } from "../types/gameTypes";

export const getQuestion = async (
  difficulty: Difficulty
): Promise<Question> => {
  //await new Promise(resolve => setTimeout(resolve, 3000))
  const { data } = await axios.get(
    `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=boolean`
  )

  return data.results[0];
};
