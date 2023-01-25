import React, { useEffect, useState } from 'react'
import useOptimizer from '../../hooks/useOptimizer'

export default function OptimalGuess({ solution, guesses, possibleSolutions }) {

  const { findOptimalWords } = useOptimizer({ solution, guesses, possibleSolutions })

  const [optimalWords, setOptimalWords] = useState([])

  useEffect (() => {
    setOptimalWords(findOptimalWords(possibleSolutions))
  }, [])



  return (
    <div>
      <h3>The optimal guess(es) is:</h3>
      {optimalWords.map((word, index) => {
        return <p key={index}>{word}</p>
      })}
      {/* <p>{optimalWords}</p> */}
    </div>
  )
}
