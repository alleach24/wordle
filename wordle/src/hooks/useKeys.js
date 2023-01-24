import { useState } from "react"
import { GUESSWORDS } from "../data/guess_words.js"

const useKeys = () => {

    const [currentGuess, setCurrentGuess] = useState('')

    const handleKeyboardKey = (key) => {
        if (key === 'Backspace') {
            setCurrentGuess((prev) => {return prev.slice(0,-1)})
            return
        }
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {return prev + key.toLowerCase()})
            }
        }
    }

    const handleSubmit = () => {
        if (currentGuess.length !== 5) {
            alert('Guess must have 5 letters')
            return ''
        }
        if (!GUESSWORDS.includes(currentGuess)) {
            alert('Invalid guess')
            return ''
        }
        // console.log('submitted the guess - ' + currentGuess)

        return currentGuess
    }


    // add screen keyboard functionality


    const resetKeys = () => {
        setCurrentGuess('')
    }


    return { currentGuess, handleKeyboardKey, handleSubmit, resetKeys }
}

export default useKeys