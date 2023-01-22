import React, { useState } from 'react'
import useGetSolution from '../../hooks/useGetSolution'

export default function Wordle() {
    const { getRandomSolution } = useGetSolution()

    const [solution, setSolution] = useState(null)


    const setupRandomGame = () => {
        let randomSolution = getRandomSolution()
        console.log(randomSolution)
        setSolution(randomSolution)
    }

    const setupCustomGame = () => {

    }



    return (
        <div>
            <h2>Wordle</h2>
            <button onClick={setupRandomGame}>New Game</button>
            <button onClick={setupCustomGame}>Custom Game</button>
        </div>
    )
}
