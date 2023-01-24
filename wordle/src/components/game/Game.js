import React, { useEffect, useState} from 'react'
import useWordle from '../../hooks/useWordle'
import Grid from './Grid'
import Keyboard from './Keyboard'
import GameEndModal from './GameEndModal'

export default function Game({ solution }) {
    const { currentGuess, handleKeyup, guesses, turn, isCorrect, resetWordle, usedKeys } = useWordle(solution)
    const [showModal, setShowModal] = useState(false)
    const [exitModal, setExitModal] = useState(false)

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup)

        if (isCorrect) {
            console.log('You win!')
            if (!exitModal) {
                setTimeout(() => setShowModal(true), 2500)
            } else {
                setShowModal(false)
            }
            window.removeEventListener('keyup', handleKeyup)
        }
        if (turn > 5) {
            console.log('You lose!')
            if (!exitModal) {
                setTimeout(() => setShowModal(true), 2500)
            } else {
                setShowModal(false)
            }
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn, exitModal]) 


    useEffect(() => {
        setExitModal(false)
        setShowModal(false)
        resetWordle() 
        // eslint-disable-next-line
    }, [solution])

    const closeModal = () => {
        setExitModal(true)
        setShowModal(false)
    }


  return (
    <div key={solution}>
        <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
        <Keyboard usedKeys={usedKeys}/>
        {showModal && <GameEndModal isCorrect={isCorrect} turn={turn} solution={solution} close={closeModal}/>}
    </div>

  )
}
