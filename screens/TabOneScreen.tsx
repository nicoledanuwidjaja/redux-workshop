import React, { useState } from 'react';
import Colors from '../constants/Colors';
import { TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import HangmanGame from '../components/HangmanGame';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [isGame, setIsGame] = useState<Boolean>(false);
  const [phrase, onChangeText] = useState<string>("");

  const submitWord = () => {
    console.log("Phrase: ", phrase);
    setIsGame(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hangman</Text>
      { 
        isGame ?
        <HangmanGame phrase={phrase} />
        : 
        <View style={styles.newGameContainer}>
          <Text style={styles.prompt}>Choose a word or phrase</Text>
          <TextInput
            style={styles.wordInput}
            onChangeText={onChangeText}
            value={phrase}
            maxLength={25}
          />
          <TouchableOpacity style={styles.button} onPress={submitWord}>
            <Text style={styles.buttonText}>
              Play!
            </Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    alignItems: 'center',
  },
  newGameContainer: {
    flex: 1,
    marginVertical: 50,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  wordInput: {
    textAlign: 'center',
    width: 150,
    letterSpacing: 1,
    fontSize: 20,
    height: 50,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  prompt: {
    margin: 10,
    fontSize: 15,
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
