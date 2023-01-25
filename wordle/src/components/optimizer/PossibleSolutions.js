import React, { useEffect, useState } from 'react'
// import useOptimizer from '../../hooks/useOptimizer'

export default function PossibleSolutions( {possibleSolutions} ) {
    // eslint-disable-next-line
    const [groups, setGroups] = useState([])

    useEffect(() => {
        let newGroups = []
        let sols = [...possibleSolutions]
        while (sols.length > 10) {
            newGroups.push([sols.slice(0,10)])
            sols = sols.slice(10)
        }
        newGroups.push([sols])
        setGroups(newGroups)
    },[possibleSolutions])
    
    return (
        <div>
            <h4>There are {possibleSolutions.length} possible solutions:</h4>
            {possibleSolutions.map((word, index) => {
                return (
                    <p key={index}>{word}</p>
                )
            })}
        </div>
    )
}


