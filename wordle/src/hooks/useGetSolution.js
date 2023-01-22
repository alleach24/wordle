import { SOLUTIONWORDS } from "../data/solution_words"

const useGetSolution = () => {

    const getRandomSolution = () => {
        let gameSolution = SOLUTIONWORDS[Math.floor(Math.random() * SOLUTIONWORDS.length)]
        
        return gameSolution
    }


    return { getRandomSolution}
}

export default useGetSolution