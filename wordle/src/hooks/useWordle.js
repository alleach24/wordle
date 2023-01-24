import { useState } from "react"
import useKeys from "./useKeys";

const useWordle = (solution) => {
    const {currentGuess, handleKeyboardKey, handleSubmit, resetKeys} = useKeys()

    const [turn, setTurn] = useState(0);
    const [guesses, setGuesses] = useState([...Array(6)])
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({}) // {a:'green', b:'yellow'}

    
    const handleKeyup = ({ key }) => {
        if (key === 'Enter') {
            if (turn > 5) {
                // console.log("No more guesses left")
                return
            }
            let submittedGuess = handleSubmit()
            if (submittedGuess === '') {
                return
            }
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
        // console.log('formatting the guess - ' + guess)

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
            console.log('useWordle')
            console.log(newGuesses)
            return newGuesses
        })
        setTurn((prevTurn) => { return prevTurn+1 })
        resetKeys()
        setUsedKeys((prevUsedKeys) => {
            let newKeys = {...prevUsedKeys}
            formattedGuess.forEach((letterDict, index) => {
                const currentKeyColor = newKeys[letterDict.letter]
                if (letterDict.color === 'green') {
                    newKeys[letterDict.letter] = 'green-key'
                    return
                } 
                if (letterDict.color === 'yellow' && currentKeyColor !== 'green-key') {
                    newKeys[letterDict.letter] = 'yellow-key'
                    return
                }
                if (letterDict.color === 'gray' && currentKeyColor !== 'green-key' && currentKeyColor !== 'yellow-key') {
                    newKeys[letterDict.letter] = 'gray-key'
                }
            })
            return newKeys
        })
    }


    const resetWordle = () => {
        // console.log("resetting Wordle")
        setTurn(0)
        setGuesses([...Array(6)])
        setIsCorrect(false)
        setUsedKeys({})
    }


    return { currentGuess, handleKeyup, guesses, turn, isCorrect, resetWordle, usedKeys }
}

export default useWordle