import React, { useEffect } from 'react'
import useWordle from '../../hooks/useWordle'
import Grid from './Grid'
import Keyboard from './Keyboard'

export default function Game({ solution }) {
    const { currentGuess, handleKeyup, guesses, turn, isCorrect, resetWordle, usedKeys } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            console.log('You win!')
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5) {
            console.log('You lose!')
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])

    useEffect(() => {
        resetWordle() // eslint-disable-next-line
    }, [solution])

  return (
    <div key={solution}>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        <Keyboard usedKeys={usedKeys}/>
    </div>

  )
}
