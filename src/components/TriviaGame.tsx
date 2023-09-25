import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { getQuestion } from "../api/api";
import { Difficulty, HighScore, Question } from "../types/gameTypes";
import {  defaultQuestion, getStoredDifficulty, getStoredHighScores } from "../helpers/gameHelpers";
import "./TriviaGame.scss";

const TriviaGame = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**  ---- States ---- */
  const [question, setQuestion] = useState<Question>(defaultQuestion);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Medium);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  /** ---- Constants ---- */

  /** ---- Functions ---- */

  /**
   * Update the high scores and start a new game
   * Store the high score in localStorage
   * Called when submitting a new highscore
   * @param data data that is submitted through the form using react-hook-forms
   */
  const updateScoreAndNewGame = (data: any) => {
    if(!!data.name) {
      const tempHighScores = _.orderBy([...highScores, {name: data.name, score: points} ], ['score'], ['desc'])

      if(tempHighScores.length > 5 ) {
        tempHighScores.pop();
      }

      localStorage.setItem("highScore", JSON.stringify(tempHighScores));
      setHighScores(tempHighScores);
      resetGame();
    }
  };

  /**
   * Update difficulty
   * Store the difficulty in localStorage
   * * @param difficulty difficulty to set
   */
  const saveDifficulty = (difficulty: Difficulty) => {
    localStorage.setItem("difficulty", difficulty);
    setDifficulty(difficulty);
  }

  /**
   * Generate a new question
   */
  const newQuestion = useCallback(() => {
    setIsLoading(true)
    getQuestion(difficulty).then((result) => setQuestion(result)).finally(() => setIsLoading(false));
  }, [difficulty]);

  /**
   * Reset the game by
   * - Set current points to 0
   * - Generate new question
   */
  const resetGame = () => {
    setGameOver(false);
    setPoints(0);
    newQuestion();
  };

  /**
   * Check if the selected answer is correct
   * if correct = add one point
   * if incorrect = game over
   * @param answer chosen answer
   */
  const checkAnswer = (answer: boolean) => {
    const { correct_answer } = question;
    const correctAnswer = correct_answer.toLowerCase() === 'true'; // TODO: Error handling in case API changes behaviour
    if(correctAnswer === answer) {
      setPoints(points + 1);
      newQuestion();
    } else {
      setGameOver(true);
    }
  };

  /**
   * @returns the index that the new highscore will be inserted
   * if there's no high score then return -1
   */
  const checkScoreIndex = (): number => {
    if(points > 0) {
      if(!highScores || !highScores.length) {
        return 0;
      }
  
      const position = highScores.findIndex((score) => points > score.score) 
      if(position === -1 && highScores.length < 5) {
        return highScores.length
      }

      return position;
    }

    return -1;
  };

  /** ---- UseEffects ---- */

  useEffect(() => {
    const storedDifficulty = getStoredDifficulty();
    const storedHighScores = getStoredHighScores();
    
    if (storedDifficulty) {
      setDifficulty(storedDifficulty);
    }

    if (storedHighScores) {
      setHighScores(storedHighScores);
    }
  }, [])

  useEffect(() => {
    newQuestion();

    return () => {};
  }, [newQuestion])

  return (
    <>
      <section className="controls">
        <div className="difficulty">
          <div>
            <button
              onClick={() => {
                saveDifficulty(Difficulty.Easy)
              }}
            >
              Easy
            </button>
            <button
              onClick={() => {
                saveDifficulty(Difficulty.Medium)
              }}
            >
              Medium
            </button>
            <button
              onClick={() => {
                saveDifficulty(Difficulty.Hard)
              }}
            >
              Hard
            </button>
            <button onClick={() => resetGame()}>Restart</button>
          </div>
          <h6>Current difficulty: {difficulty}</h6>
        </div>
        <div className="highscore-list">
          <h6>Top 5 scores</h6>
          <ol>
            {highScores.map((highScore, i) => {
              return (
                <li key={i}>
                  <span>{i + 1}.</span>
                  <span>{highScore.name}</span>
                  <span>{highScore.score}p</span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <section className="game">
        {!gameOver ? (
          <>
            <div className="question">
              {question && !isLoading &&
                new DOMParser().parseFromString(question.question, "text/html")
                  .documentElement.textContent}
              {isLoading && <span>Loading...</span>}
            </div>
            <div className="buttons">
              <button
                className="true"
                disabled={isLoading}
                onClick={() => {
                  checkAnswer(true)
                }}
              >
                ✓ True
              </button>
              <button
                className="false"
                disabled={isLoading}
                onClick={() => {
                  checkAnswer(false)
                }}
              >
                ✕ False
              </button>
            </div>
            <div className="score">
              <div>Points: {points}</div>
            </div>
          </>
        ) : (
          <div>
            {checkScoreIndex() > -1 ? (
              <>
                <h1>New high score!</h1>
                <div className="score">
                  <div>Points: {points}</div>
                </div>
                <form onSubmit={handleSubmit(updateScoreAndNewGame)}>
                  <fieldset>
                    <label htmlFor="name">Enter your name</label>
                    <input {...register("name", { minLength: 3 })} />
                    {errors.name && <span>Your name must be longer than 3 characters</span>}
                  </fieldset>
                  <button type="submit" disabled={!!errors.name}>Submit</button>
                </form>
              </>
            ) : (
              <>
                <h1>Game over</h1>
                <button
                  onClick={() => {
                    resetGame()
                  }}
                >
                  Try again
                </button>
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default TriviaGame;
