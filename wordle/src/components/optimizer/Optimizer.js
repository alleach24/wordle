import React, { useEffect, useState } from "react"
import PossibleSolutions from "./PossibleSolutions"
import OptimalGuess from "./OptimalGuess"
import Analysis from "./Analysis"
// import useOptimizer from "../../hooks/useOptimizer"
import { SOLUTIONWORDS } from "../../data/solution_words"

export default function Optimizer({ solution, guesses }) {

    const [showPossibleSolutions, setShowPossibleSolutions] = useState(false)
    const [showOptimalGuess, setShowOptimalGuess] = useState(false)
    const [showAnalysis, setShowAnalysis] = useState(false)
    const [possibleSolutions, setPossibleSolutions] = useState([])

    useEffect(() => {
        setPossibleSolutions(determinePossibleSolutions(guesses))
        // console.log(possibleSolutions)
        // eslint-disable-next-line
    }, [guesses])


    // guesses contains:
    // [[{'letter':'r','color':'green'},{'letter':'o','color':'yellow'}], [{}], [{}], [{}], [{}], [{}]]
    const determinePossibleSolutions = (guesses) => {
        if (guesses[0] === undefined) {
            console.log('empty guess array')
            return SOLUTIONWORDS
        }
        console.log("determining possible solutions")
        let newPossibleSolutions = []

        let colorCode = getColorCode(guesses)

        console.log('colorcode ' + colorCode)
        
    }

    const getColorCode = (guesses) => {
        let i=5
        while (guesses[i] === undefined) {
            i-=1
        } 
        let colorCode = []
        guesses[i].forEach((letterDict, index) => {
            colorCode[index] = letterDict.color
        })
        return colorCode
    }


    

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

            {showPossibleSolutions && <PossibleSolutions solution={solution} guesses={guesses} possibleSolutions={possibleSolutions}/>}
            {showOptimalGuess && <OptimalGuess solution={solution}/>}
            {showAnalysis && <Analysis solution={solution}/>}
        </div>
    )
}