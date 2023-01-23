import React, { useEffect } from 'react'
import useWordle from '../../hooks/useWordle'
import Grid from './Grid'

export default function Game({ solution }) {
    const { currentGuess, handleKeyup, guesses, turn, isCorrect } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    useEffect(() => {
        console.log(guesses, turn, isCorrect)
    }, [guesses, turn, isCorrect])

  return (
    <div>
        currentGuess = {currentGuess}
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    </div>

  )
}
