# Wordle Optimizer
##### Based off the New York Times' Wordle. To play or learn more about Wordle, visit https://www.nytimes.com/games/wordle.

### This Wordle Optimizer allows users to analyze their Wordle gameplay by calculating optimal guesses based on known information.

---

### Technologies:
- React
- Javascript
- HTML/CSS

### Installation and Run steps:
1. Download the github repo
2. From your preferred IDE, open the base folder.
3. In the command line, run the following lines:
  - npm i
  - npm run start
  The program will automatically launch a browser with the program running.
  

---
  
  
### Functions
#### Wordle gameplay
On the left side of the screen is the game Wordle just like in the New York Times. The same rules and functions apply.
You can create a random game in which the solution word will be randomly selected.
Or, you can create a custom game in which you pick the solution word. This mode enables you to analyze guesses for a particular solution. For example, if you already completed today's New York Times Wordle puzzle, you can make a custom game with that same solution and the analyze the guesses you made.

#### Wordle optimizer
On the right side of the screen is the Optimizer. The Optimizer has 3 main functions:
- Reveal possible solutions = this function shows a list of all possible solutions based on the information you have from your guesses.
- Reveal optimal guesses = this function determines the optimal guess to make next given the possible solutions
- Reveal guess analysis = this function analyzes your previous guess by calculating it's percentile for how optimal of a guess it was

### Methodology
The hardest part of this project was determining how to define and calculate the "optimal guess".

I defined the optimal guess to mean the guess that, on average, eliminates the most possible solution words. In theory, this will result in the average lowest number of guesses needed to find any solution word.


To explain the methodology I selected, I'll start by explaining a simpler game - Guess Who (learn how to play [here](https://www.ultraboardgames.com/guess-who/game-rules.php))

Lets say the Guess Who board has 19 people with black hair and 1 person with red hair. If you said "does the person have red hair", then 95% of the time the answer would be 'no' and 5% of the time the answer would be 'yes'. So in 95% of cases, the information you've gathered reduces possible solutions by 1. In 5% of cases, you've reduced the possible solutions by 19. 

On average, you are reducing the possible solutions by 1.9 (95%x1 + 5%x19).

What if the same board has 10 people with glasses and 10 people without glasses. If you said "does the person have glasses", then 50% of the time the answer would be 'no' and 50% of the time the answer would be 'yes'. In both cases, the information you've gathered reduces possible solutions by 10. 

On average, you are reducing the possible solutions by 10 (50%x10 + 50%x10).

We can see from this that guessing "does the person have glasses" is a better guess than "does the person have red hair" because the average amount of solutions eliminated by the former guess is 10, while the average amount of solutions eliminated by the latter guess is 1.9.


Wordle is more complicated because the information gathered isn't a 'yes-no' outcome. There are 5 datum that each can have 3 outcomes (5 different letters that could be gray, green, or yellow). However, the average number of solutions eliminated can still be calculated using the same equations. 

--- 

### FAQs

**Where did you get the word banks?** Before Wordle was bought by the New York Times, both the solutions word bank and the guesses word bank could be found by inspecting the website's source code. NYT has since updated the lists to take out a few words, but most of the words remain the same. This program uses the original words.

**What's the difference between the guess word bank and the solution word bank?** The guess word bank contains about 13,000 words that are valid Wordle guesses. In contrast, the solutions word bank only contains about 3,000 words that are potential Wordle solutions. The difference of 10,000 words is to account for obscure words. For example, 'pzazz' is a valid English dictionary word ([really!](https://www.dictionary.com/browse/pzazz)), however the creators of the game recognized that nobody would guess 'pzazz' as a solution word. So they curated the list of 13,000 valid English dictionary 5-letter words down to about 3,000 words that people actually recognize.

**I think your methodology of calculating the optimal guess is wrong.** That's not a question, but I'll answer anyways. Yes I do believe that an expert statistician probably would arrive at a different methodology for calculating the optimal guess than I did. I accept that my solution is likely not *actually* optimal. However, it is very close, and it is sufficient for the purposes of this program. 
