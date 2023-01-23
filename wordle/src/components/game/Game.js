import React, { useEffect } from 'react'
import useWordle from '../../hooks/useWordle'
import Grid from './Grid'

export default function Game({ solution }) {
    const { currentGuess, handleKeyup, guesses, turn, resetWordle } = useWordle(solution)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup])

    useEffect(() => {
        resetWordle() // eslint-disable-next-line
    }, [solution])

  return (
    <div key={solution}>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
    </div>

  )
}
