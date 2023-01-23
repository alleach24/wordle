import React, { useState } from 'react'
import useGetSolution from '../../hooks/useGetSolution'
import Game from './Game'

export default function Wordle() {
    const { getRandomSolution, verifyCustomSolution } = useGetSolution()

    const [solution, setSolution] = useState(null)


    const setupRandomGame = () => {
        let randomSolution = getRandomSolution()
        console.log(randomSolution)
        setSolution(randomSolution)
    }

    const setupCustomGame = () => {
        // add in error checking for if someone just exits the prompt
        // and/or maybe change this to a modal someday
        let requestedSolution = window.prompt("Enter the solution word: ").toLowerCase()
        let customSolution = verifyCustomSolution(requestedSolution)

        while (customSolution === false) {
            requestedSolution = window.prompt("Invalid solution. Enter a valid solution word:").toLowerCase()
            customSolution = verifyCustomSolution(requestedSolution)
        }
        setSolution(customSolution)
    }



    return (
        <div>
            <h2>Wordle</h2>
            {/* take away the button working on pressing enter */}
            <button onClick={setupRandomGame}>New Game</button>
            <button onClick={setupCustomGame}>Custom Game</button>
            {solution && <div>Solution = {solution}</div>}
            {solution && <Game solution={solution} />}
        </div>
    )
}
