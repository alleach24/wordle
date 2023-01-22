import { SOLUTIONWORDS } from "../data/solution_words"

const useGetSolution = () => {

    const getRandomSolution = () => {
        let gameSolution = SOLUTIONWORDS[Math.floor(Math.random() * SOLUTIONWORDS.length)]
        return gameSolution
    }

    const verifyCustomSolution = (requestedSolution) => {
        if (SOLUTIONWORDS.includes(requestedSolution)) {
            return requestedSolution
        }
        return false
    }


    return { getRandomSolution, verifyCustomSolution }
}

export default useGetSolution