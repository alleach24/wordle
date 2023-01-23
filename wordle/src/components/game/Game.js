import React, { useEffect} from 'react'
import useWordle from '../../hooks/useWordle'
import Grid from './Grid'
import Keyboard from './Keyboard'
import GameEndModal from './GameEndModal'

export default function Game({ solution }) {
    const { currentGuess, handleKeyup, guesses, turn, isCorrect, resetWordle, usedKeys } = useWordle(solution)
    
    let showModal = false

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            console.log('You win!')
            setTimeout(() => {showModal = true}, 2500)
            window.removeEventListener('keyup', handleKeyup)
        }
        if (turn > 5) {
            console.log('You lose!')
            setTimeout(() => {showModal = true}, 2500)
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])


    useEffect(() => {// eslint-disable-next-line
        resetWordle() // eslint-disable-next-line
    }, [solution])

    const closeModal = () => {
        showModal = false
    }


  return (
    <div key={solution}>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        <Keyboard usedKeys={usedKeys}/>
        {showModal && <GameEndModal isCorrect={isCorrect} turn={turn} solution={solution} close={closeModal}/>}
    </div>

  )
}
