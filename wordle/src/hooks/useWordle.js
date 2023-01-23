import { useState } from "react"
import useKeys from "./useKeys";

const useWordle = (solution) => {
    const {currentGuess, handleKeyboardKey, handleSubmit} = useKeys()

    const [turn, setTurn] = useState(0);
    const [guesses, setGuesses] = useState([])
    const [isCorrect, setIsCorrect] = useState(false)

    
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            (turn <= 5 ? formatGuess(handleSubmit()) : console.log("No more guesses left"))           
        } else {
            handleKeyboardKey(key)
        }        
    }

    const formatGuess = (guess) => {
        console.log('formatting the guess - ' + guess)

        let solutionArray = [...solution]
        let formattedGuess = [...guess].map((letter) => { 
            return {letter: letter, color: 'gray'} 
        })

        // find any green letters
        formattedGuess.forEach((letterDict, index) => {
            if (solutionArray[index] === letterDict.letter) {
                formattedGuess[index].color = 'green'
                solutionArray[index] = null
            }
        })

        // find any yellow colors
        formattedGuess.forEach((letterDict, index) => {
            if (solutionArray.includes(letterDict.letter) && letterDict.color !== 'green') {
                formattedGuess[index].color = 'yellow'
                solutionArray[solutionArray.indexOf(letterDict.letter)] = null
            }
        })

        // find any gray letters

        console.log(formattedGuess)
        return formattedGuess
    }


    return { currentGuess, handleKeyup }
}

export default useWordle