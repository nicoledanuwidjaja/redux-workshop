import React, { useState, useEffect } from 'react';
import Colors from '../constants/Colors';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { MonoText } from './StyledText';

/*
 * GuessPhrase represents the word(s) being guessed. 
 * If a letter in the phrase has been guessed, the phrase will show the letter. 
 * Otherwise, the letter will be hidden and represented with an underscore.
 */
export default function GuessPhrase({ phrase, guesses }: { phrase: string, guesses: Array<string> }) {
    const letterArray = phrase.split("");

    // Renders letter if it has been guessed, else renders underscore
    const renderLetter = (letter: string) => {
        console.log("Re-rendering!");
        if (guesses.includes(letter)) {
            return letter.toUpperCase();
        }
        return '_';
    }


    return (
        <View style={styles.phraseContainer}>
            { letterArray && letterArray.map(l => (
                <Text style={styles.guess}>
                    {renderLetter(l)}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    phraseContainer: {
      flexDirection: 'row',
      padding: 20,
    },
    guess: {
      letterSpacing: 10,
      fontSize: 30,
      fontWeight: 'bold',
    }
});
