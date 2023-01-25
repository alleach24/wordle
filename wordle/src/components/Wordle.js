import React, { useState } from 'react'
import useGetSolution from '../hooks/useGetSolution'
import Game from './game/Game'
import Optimizer from './optimizer/Optimizer'

export default function Wordle() {
    const { getRandomSolution, verifyCustomSolution } = useGetSolution()

    const [guesses, setGuesses] = useState([...Array(6)])

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
            <div className="Wordle-containers">
                <div className="Wordle-container" id="Game">
                    <h2>Wordle</h2>
                    {/* take away the button working on pressing enter */}
                    <button onClick={setupRandomGame}>Random Game</button>
                    <button onClick={setupCustomGame}>Custom Game</button>
                    {solution && <Game solution={solution} setGuesses={setGuesses}/>}
                </div>
                <div className="Wordle-container" id="Optimizer">
                    <Optimizer solution={solution} guesses={guesses}/>
                </div>
            </div>
        </div>
    )
}
