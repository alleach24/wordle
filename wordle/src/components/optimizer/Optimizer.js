import React, { useState, useEffect } from "react"
import PossibleSolutions from "./PossibleSolutions"
import OptimalGuess from "./OptimalGuess"
import Analysis from "./Analysis"
import useWordle from "../../hooks/useWordle"

export default function Optimizer({ solution }) {
    const { guesses } = useWordle(solution)  

    const [showPossibleSolutions, setShowPossibleSolutions] = useState(false)
    const [showOptimalGuess, setShowOptimalGuess] = useState(false)
    const [showAnalysis, setShowAnalysis] = useState(false)


    console.log('Optimizer')
    console.log(guesses)

    const clearDisplay = () => {
        setShowPossibleSolutions(false)
        setShowOptimalGuess(false)
        setShowAnalysis(false)
    }

    return (
        <div>
            <h2>Optimizer</h2>
            <button onClick={()=>setShowPossibleSolutions(true)}>Reveal possible solutions</button>
            <button onClick={()=>setShowOptimalGuess(true)}>Reveal the optimal guess</button>
            <button onClick={()=>setShowAnalysis(true)}>Reveal analysis on the previous guess</button>
            <button onClick={clearDisplay}>Clear</button>
            <p>Solution = {solution}</p>

            {showPossibleSolutions && <PossibleSolutions solution={solution} guesses={guesses}/>}
            {showOptimalGuess && <OptimalGuess solution={solution}/>}
            {showAnalysis && <Analysis solution={solution}/>}
        </div>
    )
}