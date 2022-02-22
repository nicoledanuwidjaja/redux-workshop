import Colors from '../constants/Colors';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { MonoText } from '../components/StyledText';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)">
            Guess the word by inputting letters. If you enter too many wrong letters, you'll hang the man and lose!
        </Text>
        <View
            style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            darkColor="rgba(255,255,255,0.05)"
            lightColor="rgba(0,0,0,0.05)">
            <MonoText>Good luck</MonoText>
        </View>
        <View style={styles.helpContainer}>
          <TouchableOpacity style={styles.helpLink}>
              <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
              Made by Husky Habits!
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginVertical: 15,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
