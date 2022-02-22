import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';

/*
 * GuessPhrase represents the word(s) being guessed. 
 * If a letter in the phrase has been guessed, the phrase will show the letter. 
 * Otherwise, the letter will be hidden and represented with an underscore.
 */
export default function GuessPhrase({ phrase, guesses }: { phrase: Array<string>, guesses: Array<string> }) {

    // Renders letter if it has been guessed, else renders underscore
    const renderLetter = (letter: string) => {
        if (guesses.includes(letter)) {
            return letter;
        } 
        if (letter === ' ') {
            return ' ';
        }
        return '_';
    }

    return (
        <View style={styles.phraseContainer}>
            { phrase && phrase.map(l => (
                <Text key={l} style={styles.guess}>
                    {renderLetter(l)}
                </Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    phraseContainer: {
      flexDirection: 'row',
      paddingVertical: 10,
      flexWrap: 'wrap',
    },
    guess: {
      letterSpacing: 10,
      fontSize: 30,
      fontWeight: 'bold',
    }
});
