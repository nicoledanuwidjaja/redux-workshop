import React, { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { MonoText } from './StyledText';
import GuessPhrase from './GuessPhrase';

export default function HangmanGame({ phrase }: { phrase: string }) {
    const [letter, onChangeText] = useState<string>("");
    const [guesses, setGuesses] = useState<Array<string>>([]);
    const [isGameOver, setIsGameOver] = useState<Boolean>(false);

    { /* State keeps track of guesses (moves) made so far and the letters at each guess */ }

    const move = (letter: string) => {
        // add guesses to history
        setGuesses(guesses => [...guesses, letter]);
        console.log(guesses);
    }

    // on every letter change, make a game move
    useEffect(() => {
        if (letter === '' || guesses.includes(letter)) return;
        move(letter);
    }, [letter])

    { /* Store state of game if currently playing or not */ }

    return (
        <View style={styles.gameContainer}>
            <Text style={styles.prompt}>Guess the word before you're hung!</Text>
            { /* Image for representing hangman state with props: { stage: Number, wrongLetters: Array<Character> } */ }
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <GuessPhrase phrase={phrase} guesses={guesses} />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                Guess a letter...
            </Text>
            <TextInput
                style={styles.letterInput}
                onChangeText={onChangeText}
                value={letter.toUpperCase()}
                maxLength={1}
            />
            { 
                isGameOver && 
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>
                        Play!
                    </Text>
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
    getStartedText: {
      fontSize: 17,
      lineHeight: 24,
      textAlign: 'center',
    },
    prompt: {
      margin: 10,
      fontSize: 15,
      color: 'blue',
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
      marginVertical: 30,
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
