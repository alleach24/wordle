import { useState } from "react"
import useKeys from "./useKeys";

const useWordle = (solution) => {
    const {currentGuess, handleKeyboardKey, handleSubmit, resetKeys} = useKeys()

    const [turn, setTurn] = useState(0);
    const [guesses, setGuesses] = useState([...Array(6)])
    const [isCorrect, setIsCorrect] = useState(false)

    
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) {
                console.log("No more guesses left")
                return
            }
            let submittedGuess = handleSubmit()
            let formattedGuess = formatGuess(submittedGuess)
            addNewGuess(formattedGuess)

            if (submittedGuess === solution) {
                setIsCorrect(true)
            }
            
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

        return formattedGuess
    }


    const addNewGuess = (formattedGuess) => {
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setTurn((prevTurn) => { return prevTurn+1 })
        resetKeys()
    }

    return { currentGuess, handleKeyup, guesses, turn, isCorrect }
}

export default useWordle