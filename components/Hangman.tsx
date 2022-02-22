import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Hangman({ stage }: { stage: number }) {
    const stageImages = [
        require('../assets/images/hangman-1.png'),
        require('../assets/images/hangman-2.png'),
        require('../assets/images/hangman-3.png'),
        require('../assets/images/hangman-4.png'),
        require('../assets/images/hangman-5.png'),
        require('../assets/images/hangman-6.png'),
        require('../assets/images/hangman-7.png'),
        require('../assets/images/hangman-8.png')
    ];

    return (
        <Image style={styles.hangman} source={stageImages[stage]} />
    );
}

const styles = StyleSheet.create({
    hangman: {
        width: 150,
        height: 190,
        marginRight: 20,
        resizeMode: 'contain'
    },
});