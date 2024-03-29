import { GUESSWORDS } from "../data/guess_words"
import { SOLUTIONWORDS } from "../data/solution_words"

const useOptimizer = ( {solution, guesses, possibleSolutionsList } ) => {


    const formatGuessArray = (guesses, previous) => {
        let i=5
        while (guesses[i] === undefined) {
            i-=1
        } 
        // if (previous) {
        //     i-=1
        // }
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


    const evaluateWord = (guess, possibleSolutionsList) => {
        let buckets = {'00000': 0, '00001': 0, '00002': 0, '00010': 0, '00011': 0, '00012': 0, 
        '00020': 0, '00021': 0, '00022': 0, '00100': 0, '00101': 0, '00102': 0, '00110': 0, 
        '00111': 0, '00112': 0, '00120': 0, '00121': 0, '00122': 0, '00200': 0, '00201': 0, 
        '00202': 0, '00210': 0, '00211': 0, '00212': 0, '00220': 0, '00221': 0, '00222': 0, 
        '01000': 0, '01001': 0, '01002': 0, '01010': 0, '01011': 0, '01012': 0, '01020': 0, 
        '01021': 0, '01022': 0, '01100': 0, '01101': 0, '01102': 0, '01110': 0, '01111': 0, 
        '01112': 0, '01120': 0, '01121': 0, '01122': 0, '01200': 0, '01201': 0, '01202': 0, 
        '01210': 0, '01211': 0, '01212': 0, '01220': 0, '01221': 0, '01222': 0, '02000': 0, 
        '02001': 0, '02002': 0, '02010': 0, '02011': 0, '02012': 0, '02020': 0, '02021': 0, 
        '02022': 0, '02100': 0, '02101': 0, '02102': 0, '02110': 0, '02111': 0, '02112': 0, 
        '02120': 0, '02121': 0, '02122': 0, '02200': 0, '02201': 0, '02202': 0, '02210': 0, 
        '02211': 0, '02212': 0, '02220': 0, '02221': 0, '02222': 0, '10000': 0, '10001': 0, 
        '10002': 0, '10010': 0, '10011': 0, '10012': 0, '10020': 0, '10021': 0, '10022': 0, 
        '10100': 0, '10101': 0, '10102': 0, '10110': 0, '10111': 0, '10112': 0, '10120': 0, 
        '10121': 0, '10122': 0, '10200': 0, '10201': 0, '10202': 0, '10210': 0, '10211': 0, 
        '10212': 0, '10220': 0, '10221': 0, '10222': 0, '11000': 0, '11001': 0, '11002': 0, 
        '11010': 0, '11011': 0, '11012': 0, '11020': 0, '11021': 0, '11022': 0, '11100': 0, 
        '11101': 0, '11102': 0, '11110': 0, '11111': 0, '11112': 0, '11120': 0, '11121': 0, 
        '11122': 0, '11200': 0, '11201': 0, '11202': 0, '11210': 0, '11211': 0, '11212': 0, 
        '11220': 0, '11221': 0, '11222': 0, '12000': 0, '12001': 0, '12002': 0, '12010': 0, 
        '12011': 0, '12012': 0, '12020': 0, '12021': 0, '12022': 0, '12100': 0, '12101': 0, 
        '12102': 0, '12110': 0, '12111': 0, '12112': 0, '12120': 0, '12121': 0, '12122': 0, 
        '12200': 0, '12201': 0, '12202': 0, '12210': 0, '12211': 0, '12212': 0, '12220': 0, 
        '12221': 0, '12222': 0, '20000': 0, '20001': 0, '20002': 0, '20010': 0, '20011': 0, 
        '20012': 0, '20020': 0, '20021': 0, '20022': 0, '20100': 0, '20101': 0, '20102': 0, 
        '20110': 0, '20111': 0, '20112': 0, '20120': 0, '20121': 0, '20122': 0, '20200': 0, 
        '20201': 0, '20202': 0, '20210': 0, '20211': 0, '20212': 0, '20220': 0, '20221': 0, 
        '20222': 0, '21000': 0, '21001': 0, '21002': 0, '21010': 0, '21011': 0, '21012': 0, 
        '21020': 0, '21021': 0, '21022': 0, '21100': 0, '21101': 0, '21102': 0, '21110': 0, 
        '21111': 0, '21112': 0, '21120': 0, '21121': 0, '21122': 0, '21200': 0, '21201': 0, 
        '21202': 0, '21210': 0, '21211': 0, '21212': 0, '21220': 0, '21221': 0, '21222': 0, 
        '22000': 0, '22001': 0, '22002': 0, '22010': 0, '22011': 0, '22012': 0, '22020': 0, 
        '22021': 0, '22022': 0, '22100': 0, '22101': 0, '22102': 0, '22110': 0, '22111': 0, 
        '22112': 0, '22120': 0, '22121': 0, '22122': 0, '22200': 0, '22201': 0, '22202': 0, 
        '22210': 0, '22211': 0, '22212': 0, '22220': 0, '22221': 0, '22222': 0}
        possibleSolutionsList.forEach(possibleSolution => {
            let colorCode = buildColorCode(guess, possibleSolution)
            buckets[colorCode] += 1
        })
        return buckets
    }

    function calculateStandardDeviation(buckets) {
        let bucketVals = Object.values(buckets)
        let mean = bucketVals.reduce((partialSum,a) => { return partialSum+a }, 0) / bucketVals.length;
        return Math.sqrt(bucketVals.reduce((partialSum,a)=> partialSum+((a - mean) ** 2),0) / bucketVals.length)
    }

    function findOptimalWords(possibleSolutionsList) {
        if (possibleSolutionsList.length <= 2) {
            return possibleSolutionsList
        }
        if (possibleSolutionsList.length === SOLUTIONWORDS.length) {
            return ['roate']
        }
        let stdDevs = {}
        let minStdDev = 1000000
        GUESSWORDS.forEach(guess => {
            let stdDev = calculateStandardDeviation(evaluateWord([...guess],possibleSolutionsList))
            stdDevs[guess] = stdDev
            if (stdDev < minStdDev) {
                minStdDev = stdDev
            }
        })
        let bestGuesses = Object.keys(stdDevs).filter(word => stdDevs[word] === minStdDev)
        return bestGuesses
    }


    function guessAnalysis(guesses, previousPossibleSolutions) {
        if (previousPossibleSolutions.length === 0) {
            previousPossibleSolutions = SOLUTIONWORDS
        }
        let previousGuess = formatGuessArray(guesses, true)

        let stdDevs = {}
    
        let previousGuessStdDev = calculateStandardDeviation(evaluateWord([...previousGuess], previousPossibleSolutions))
        console.log("previous guess stddev " + previousGuessStdDev)
        let betterGuesses = 0
        let worseGuesses = 0
    
        GUESSWORDS.forEach(guess => {
            let newGuessStdDev = calculateStandardDeviation(evaluateWord([...guess],previousPossibleSolutions))
            stdDevs[guess] = newGuessStdDev
            // console.log(newGuessStdDev)
            if (newGuessStdDev < previousGuessStdDev) {
                betterGuesses += 1
            } else if (newGuessStdDev > previousGuessStdDev) {
                worseGuesses += 1
            }
        })
    
        let minStdDev = Math.min(...Object.values(stdDevs))
        let bestGuesses = Object.keys(stdDevs).filter(word => stdDevs[word] === minStdDev)
    
        let percentile = worseGuesses / GUESSWORDS.length * 100
    
        return [percentile, bestGuesses]
    }







    return { formatGuessArray, buildColorCode, findOptimalWords, guessAnalysis }
}

export default useOptimizer