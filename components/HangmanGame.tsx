import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Keyboard from './Keyboard';
import { Text, View } from './Themed';
import GuessPhrase from './GuessPhrase';
import ConfettiCannon from 'react-native-confetti-cannon';
import Hangman from './Hangman';

export default function HangmanGame({ setIsNewGame, phrase }: { 
    setIsNewGame: React.Dispatch<React.SetStateAction<Boolean>>, 
    phrase: string 
}) {
    const [letter, onChangeText] = useState<string>("");
    const [guesses, setGuesses] = useState<Array<string>>([]);
    const [wrongGuesses, setWrongGuesses] = useState<Array<string>>([]);
    const [isGameWon, setIsGameWon] = useState<Boolean>(false);
    const [isGameOver, setIsGameOver] = useState<Boolean>(false);

    { /* State keeps track of guesses (moves) made so far and the letters at each guess */ }
    const parsedPhrase: Array<string> = phrase.toUpperCase().split('');

    // trigger move and add guess to list of total guesses and wrong guesses
    const move = (letter: string) => {
        if (letter === '' || guesses.includes(letter)) return;
        console.log("Guess: ", letter);
        // add guesses to history
        setGuesses(guesses => [...guesses, letter]);
        if (!parsedPhrase.includes(letter) && !wrongGuesses.includes(letter)) {
            setWrongGuesses(guesses => [...guesses, letter]);
        }
    }

    // check if all letters have been revealed, then end game
    const checkIsGameOver = () => {
        const gameIsNotOver = (letter : string) => !guesses.includes(letter) && letter !== ' ';
        if (wrongGuesses.length === 7) setIsGameOver(true);
        if (parsedPhrase.some(gameIsNotOver)) return;
        setIsGameOver(true);
        setIsGameWon(true);
    }

    // on every letter change, make a game move
    useEffect(() => {
        if (letter === '' || guesses.includes(letter)) return;
        move(letter);
    }, [letter])

    // call to check current game state after every guess
    useEffect(() => {
        checkIsGameOver();
    }, [guesses])

    return (
        <View style={styles.gameContainer}>
            { !isGameOver && <Text style={styles.prompt}>Guess the word before you're hung!</Text> }
            { isGameOver && !isGameWon && <Text style={styles.prompt}>YOU DIED!</Text> }
            { isGameWon && 
                <View>
                    <Text style={styles.prompt}>YOU WIN!</Text> 
                    <ConfettiCannon count={500} fallSpeed={5000} origin={{x: -150, y: 0}} />
                </View>
            }
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.hangmanContainer}>
                { /* Image for representing hangman state with props: { stage: Number } */ }
                <Hangman stage={wrongGuesses.length} />
                <View style={styles.wrongGuessContainer}>
                    { wrongGuesses && wrongGuesses.map(l => (
                        <Text key={l} style={styles.wrongGuess}>{l}</Text>
                    ))}
                </View>
            </View>
            <GuessPhrase phrase={parsedPhrase} guesses={guesses} />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            { !isGameOver && 
                <Keyboard
                    disabledKeyList={guesses}
                    onKeyPress={move}
                />
            }
            { isGameOver && 
                <TouchableOpacity style={styles.button} onPress={() => setIsNewGame(false)}>
                    <Text style={styles.buttonText}>New game</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    gameContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    hangmanContainer: {
      flexDirection: 'row',
      paddingHorizontal: 50,
    },
    wrongGuess: {
      letterSpacing: 5,
      color: "red",
      fontSize: 24,
      fontWeight: 'bold',
    },
    wrongGuessContainer: {
      width: 70,
      height: 150,
      flexWrap: 'wrap',
    },
    keyboardContainer: {
      flexGrow: 1,
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    phraseContainer: {
      flexDirection: 'row',
      padding: 20,
    },
    prompt: {
      margin: 10,
      fontSize: 15,
      color: 'orange',
    },
    letterInput: {
      textAlign: 'center',
      width: 40,
      fontSize: 20,
      height: 40,
      margin: 12,
      borderWidth: 2,
      padding: 10,
    },
    separator: {
      marginVertical: 5,
      height: 1,
      width: '80%',
    },
    button: {
      backgroundColor: "lightgray",
      borderRadius: 5,
      width: 100,
      marginVertical: 50,
      paddingVertical: 10,
    },
    buttonText: {
      textAlign: 'center',
    },
});
