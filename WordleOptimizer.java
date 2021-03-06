/* Created by: Andrea Leach
   Date: 09 FEB 2022
   Detailed description goes here
*/

// import statements go here
import java.util.*;
import java.io.BufferedReader;
import java.io.FileReader;
import java.lang.*;

public class WordleOptimizer {
   
   // main method
   public static void main(String[] args) throws Exception {
      // create a boolean that you want to play a game
      boolean play = false;
      
      Scanner keyboard = new Scanner(System.in);
      System.out.print("Do you want to optimize a word? y/n: ");
      String playString = keyboard.nextLine();
      if (playString.equals("y") || playString.equals("Y")) {
         play = true;
      } else {
         System.exit(0);
      } // maybe eventually add functionality for someone typing something other than "y" or "n"
      
      // add a functionality for hard mode vs easy mode
      Boolean hard = false;
      System.out.print("Do you want to play on hard mode (must maintain known letters) or easy mode (can guess any number of letters)? H = hard, E = easy: ");
      playString = keyboard.nextLine();
      if (playString.equals("H") || playString.equals("E")) {
         hard = true;
         System.out.print("Playing in hard mode.");
      } else if (playString.equals("E") || playString.equals("e")) {
         System.out.print("Playing in easy mode");
      } else {
         System.out.print("By default, you will be playing in easy mode.");
      }
      
      
      Set<String> possibleGuessWords;
      String answer;
      
      WordleGame mygame = new WordleGame();
      mygame.setWordLists();
      while (play) {
                 
         mygame.setKnownAnswer();
         answer = mygame.getAnswer();
         possibleGuessWords = mygame.getGuessWordList();
         
         String nextGuess = bestGuess(possibleGuessWords);
         System.out.println();
         System.out.println("The first best guess is: " + nextGuess);
         int guesscount = 1;

         while (!answer.equals(nextGuess)) {

            // match should be 0 if the letter is not in the answer, 1 if it's in the answer but not in the right spot, and 2 if it's in the answer and in the right spot
            int[] match = new int[5];
            for (int i = 0; i < 5; i++) {
               if (nextGuess.charAt(i) == answer.charAt(i)) {
                  match[i] = 2; }
               else if (answer.contains(String.valueOf(nextGuess.charAt(i)))) {
                  match[i] = 1; }
            }


            possibleGuessWords = createPossibleWords(match, nextGuess, possibleGuessWords);
            nextGuess = bestGuess(possibleGuessWords);
            //////////////////System.out.println();
            System.out.println("The next best guess is:  " + nextGuess);
            //////////////////System.out.println();
            guesscount++;

         }

         System.out.println();
         System.out.println("Congrats! you got the word '" + nextGuess + "' in " + guesscount + " guesses!!!");
         System.out.println();
         
         System.out.print("Would you like to go again? y/n: ");
         playString = keyboard.nextLine();
         if (playString.equals("n") || playString.equals("N")) {
            play = false;
         }
      } 
         
   }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   
   public static Set<String> createPossibleWords(int[] match, String previousGuess, Set<String> possibleWords) {
      // create a new set of possible words
      Set<String> newPossibleWords = new HashSet<String>(possibleWords);
      // apply what you learned from the last word to the new set of words and remove words that can no longer be the answer
      for (String word : possibleWords) {
         for (int i = 0; i<5; i++) {
            if (match[i] == 0 && word.contains(String.valueOf(previousGuess.charAt(i)))) {
               newPossibleWords.remove(word);
            }
            else if (match[i] == 1 && !word.contains(String.valueOf(previousGuess.charAt(i)))) {
               newPossibleWords.remove(word);
            }
            else if (match[i] == 1 && word.charAt(i) == previousGuess.charAt(i)) {
               newPossibleWords.remove(word);
            }
            else if (match[i] == 2 && !(word.charAt(i) == previousGuess.charAt(i))) {
               newPossibleWords.remove(word);
            }
         }
      }
      
      
      ////////////////////System.out.println();
      ////////////////////System.out.println("new possible words after guessing " + previousGuess + ": ");
      for (String word : newPossibleWords) {
         ////////////////////System.out.println(word);
      }
      ////////////////////System.out.println();
      
      return newPossibleWords;
   }
   
   
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   // CALCULATE THE NEXT BEST WORD TO GUESS
   public static String bestGuess(Set<String> possibleWords) {
      // create a map and instantiate it with the 26 letters and a count of 0 for each
      Map<Character, Double> letter_counts = new HashMap<Character, Double>();
      letter_counts.put('a', 0.0);
      letter_counts.put('b', 0.0);
      letter_counts.put('c', 0.0);
      letter_counts.put('d', 0.0);
      letter_counts.put('e', 0.0);
      letter_counts.put('f', 0.0);
      letter_counts.put('g', 0.0);
      letter_counts.put('h', 0.0);
      letter_counts.put('i', 0.0);
      letter_counts.put('j', 0.0);
      letter_counts.put('k', 0.0);
      letter_counts.put('l', 0.0);
      letter_counts.put('m', 0.0);
      letter_counts.put('n', 0.0);
      letter_counts.put('o', 0.0);
      letter_counts.put('p', 0.0);
      letter_counts.put('q', 0.0);
      letter_counts.put('r', 0.0);
      letter_counts.put('s', 0.0);
      letter_counts.put('t', 0.0);
      letter_counts.put('u', 0.0);
      letter_counts.put('v', 0.0);
      letter_counts.put('w', 0.0);
      letter_counts.put('x', 0.0);
      letter_counts.put('y', 0.0);
      letter_counts.put('z', 0.0);
      
      
      
      // FIGURE OUT THE PERCENTAGES FOR EACH LETTER
      // create an int to count the total number of possible words in the argument
      int wordCount = possibleWords.size();
      
      Set<Character> lettersSet = new LinkedHashSet<Character>();
      for (String word : possibleWords) {
         Character[] wordArray = {word.charAt(0), word.charAt(1), word.charAt(2), word.charAt(3), word.charAt(4)};
         lettersSet.clear();
         lettersSet.addAll(Arrays.asList(wordArray));
         
         for (char letter : lettersSet) {
            letter_counts.put(letter, (letter_counts.get(letter) + 1));
         }
      }
      // why the funny math? we're gonna eventually want the letter that will eliminate the most other words. This is defined by the letter that appears the closest to 50% 
      // of the time. So to find that, assuming you have the percentages of letters from 0 to 1.0, you find the closest to 0.5 by subtracting 0.5 from each value, taking the 
      // absolute valueof that, and then looking for the lowest numbers
      for (char key : letter_counts.keySet()) {
         letter_counts.put(key, Math.abs((letter_counts.get(key) / wordCount) - 0.5));
      }
      // and this sorts the map so that the lowest values are at the beginning
      letter_counts = sortByValues(letter_counts);
      ///////////////////////////System.out.println("letter_counts: " + letter_counts);
      ////////////////////System.out.println();
      
      
      HashMap<String, Double> wordValues = new HashMap<String, Double>();
      double wordValue;
      Set<Character> set = new HashSet<Character>();
      for (String word : possibleWords) {
         wordValue = 0;
                  
         for (int i = 0; i < word.length(); i++) {
            if (!set.contains(word.charAt(i))) {
               wordValue = wordValue + letter_counts.get(word.charAt(i));  
            }
            else {
               wordValue = wordValue + 0.5;
            }
            set.add(word.charAt(i));
         }
         /////////////////////////////System.out.println(word + ": " + wordValue);
         ///////////////////////////System.out.println();
         set.clear();
         
         
         wordValues.put(word, wordValue);
      }

      wordValues = sortByValuesString(wordValues);
      //////////////////////System.out.println(wordValues);
      
      

      // this will return the single most optimal guess (or one of them if they're tied - eventually this will have to be fixed by letter placement)
      
      /////////////////////  String bestGuess = wordValues.get(wordValues.keySet().iterator().next());
      ///////////////////////System.out.println("wordValues map: " + wordValues);
      ///////////////////////System.out.println("wordValues key Set: " + wordValues.keySet());
      ////////////////////// System.out.println("wordValues first key: " + wordValues.keySet().iterator().next());
      String bestGuess = wordValues.keySet().iterator().next();
      return bestGuess;
   }
  
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   // this method sorts a Map<Character, Double>. specifically it's used to sort the letters by their likelihood of occuring in the word.
   public static HashMap<Character, Double> sortByValues(Map<Character, Double> letter_counts) {
      // this chunk of code sorts the letters by their value
      List<Map.Entry<Character, Double> > list = new LinkedList<Map.Entry<Character, Double> >(letter_counts.entrySet());
      Collections.sort(list, new Comparator<Map.Entry<Character, Double> >() {
         public int compare(Map.Entry<Character, Double> o1, Map.Entry<Character, Double> o2)
         {
            return (o1.getValue()).compareTo(o2.getValue());
         }
      });
      HashMap<Character, Double> temp = new LinkedHashMap<Character, Double>();
      for (Map.Entry<Character, Double> aa : list) {
         temp.put(aa.getKey(), aa.getValue());
      }  
      return temp;
   }
   
      // this method sorts a Map<String, Double>. specifically it's used to sort the words by their optimization value.
   public static HashMap<String, Double> sortByValuesString(Map<String, Double> letter_counts) {
      List<Map.Entry<String, Double> > list = new LinkedList<Map.Entry<String, Double> >(letter_counts.entrySet());
      Collections.sort(list, new Comparator<Map.Entry<String, Double> >() {
         public int compare(Map.Entry<String, Double> o1, Map.Entry<String, Double> o2)
         {
            return (o1.getValue()).compareTo(o2.getValue());
         }
      });
      HashMap<String, Double> temp = new LinkedHashMap<String, Double>();
      for (Map.Entry<String, Double> aa : list) {
         temp.put(aa.getKey(), aa.getValue());
      }  
      return temp;
   }
   
   
   
}
