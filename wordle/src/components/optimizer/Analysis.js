import React, { useEffect, useState } from 'react'
import useOptimizer from '../../hooks/useOptimizer'

export default function Analysis({ solution, guesses, possibleSolutions }) {
  const { guessAnalysis } = useOptimizer({ solution, guesses, possibleSolutions })

  const [stdDev, setStdDev] = useState(0)
  const [betterGuesses, setBetterGuesses] = useState([])

  useEffect(() => {
    let obj = guessAnalysis(guesses, possibleSolutions)
    console.log(obj)
    setStdDev(obj[0])
    setBetterGuesses(obj[1])

  }, [])

  return (
    <div>
      <h3>Previous guess analysis</h3>
      <p>Your guess was in the top {stdDev}% of guesses</p>
      <p>Some better guesses would have been:</p>
      {betterGuesses.map((word, index) => {
        return <p key={index}>{word}</p>
      })}
    </div>
  )
}
