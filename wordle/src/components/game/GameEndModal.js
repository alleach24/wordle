import React from 'react'

export default function GameEndModal({ isCorrect, turn, solution, close }) {
  return (
    <div className="modal">      
      {isCorrect && (
        <div>
          <button onClick={close}>X</button>
          <h1>You win!</h1>
          <p className="solution">Solution: {solution}</p>
          <p>You found the solution in {turn} guesses!</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <button onClick={close}>X</button>
          <h1>You ran out of guesses!</h1>
          <p className="solution">Solution: {solution}</p>
          <p>Better luck next time!</p>
        </div>
      )}
    </div>
  )
}
