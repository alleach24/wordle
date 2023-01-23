import React from 'react'

export default function Row({ guess }) {

    if (guess) {
        return (
            <div className="row past">
                {guess.map((letterDict, index) => {
                    return <div key={index} className={letterDict.color}>{letterDict.letter}</div>
                })}
            </div>
        )
    }

  return (
    <div className="row">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
  )
}
