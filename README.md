# Trivia Game

### Game loop

1. Players get provided with a true/false question
2. Players can then choose true/false
   1. Correct answer: Points increase by 1
   2. Wrong answer
      1. If score > lowest highscore then show view to submit highscore (names must be longer than 3 characters)
      2. If score < lowest highscore then show game over
3. Repeat step 1

### Features

- Players should be able to choose easy, medium or hard difficulty.
- Difficulty should start at medium
- A top 5 highscore list that is stored in a client-side storage

## Technical description

### Packages

Following packages already installed and can be used in the task. Feel free to add more if you want to.

- Axios
- Lodash
- React-hook-form
- SCSS
- Typescript

### Folder structure

You should familiarise yourself with the following files:

- api
  - api.ts
- components
  - TriviaGame.scss
  - TriviaGame.tsx
- types
  - gameTypes.ts

## To get started

1. First install all libraries using: (You may need to install yarn to run this command)
   yarn
2. Run the code use:
   yarn start

## Description

You most likely only need to add code in TriviaGame.tsx but if you feel the need to add anything in the other files, feel free to do it. There is already a few empty functions to get you started but feel free there as well to add whatever you may need. You can add UseEffects and styles however you like.

Overall, this is a very open task where you can approach the solution in any manner you like but it’s encouraged to use the already installed libraries. You can also add any other features if you'd like.

### Expectations

We'd like you to try get the main game loop running but don't feel pressured to have everything working perfectly as we will use this test as a base for discussions rather than a qualifier. Only spend as much time as you are comfortable with, but we'd prefer it if you send within a week.
