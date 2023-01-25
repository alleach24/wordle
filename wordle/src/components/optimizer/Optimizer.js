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
        let guess = formatGuessArray(guesses)
        let colorCode = buildColorCode(guess, solution)
        
        possibleSolutions.forEach((word) => {
            let testColorCode = buildColorCode(guess, word)
            if (testColorCode === colorCode) {
                newPossibleSolutions.push(word)
            }
        })
        return newPossibleSolutions
        
    }

    const formatGuessArray = (guesses) => {
        let i=5
        while (guesses[i] === undefined) {
            i-=1
        } 
        let guessArray = []
        guesses[i].forEach((letterDict, index) => {
            guessArray[index] = letterDict.letter
        })
        return guessArray
    }


    const buildColorCode = (guessArray, solution) => {
        // green = 2
        // yellow = 1
        // gray = 0

        let colorCodeArr = ['0','0','0','0','0']
        let solutionArray = solution.split('')

        // find any green letters
        guessArray.forEach((letter, index) => {
            if (solutionArray[index] === letter) {
                colorCodeArr[index] = '2'
                solutionArray[index] = null
            }
        })

        // find any yellow letters 
        guessArray.forEach((letter, index) => {
            if (solutionArray.includes(letter) && colorCodeArr[index] !== '2') {
                colorCodeArr[index] = '1'
                solutionArray[solutionArray.indexOf(letter)] = null
            }
        })
        return colorCodeArr.join('')
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

            {showPossibleSolutions && <PossibleSolutions possibleSolutions={possibleSolutions}/>}
            {showOptimalGuess && <OptimalGuess solution={solution}/>}
            {showAnalysis && <Analysis solution={solution}/>}
        </div>
    )
}