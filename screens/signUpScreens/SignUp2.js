import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import BackgroundLinear from '../../components/BackgroundLinear';
import LogoImage from '../../components/LogoImage';

const SignUp2 = ({ navigation }) => {
    return (
        <BackgroundLinear>
          <SafeAreaView style={styles.container}>
            <LogoImage></LogoImage>
            <View style={styles.textContainer}>
              <Text style={styles.introductionText} accessibilityLabel='Welcome to Your Fitness App'>Welcome to Your Fitness App!</Text>
            </View>
          </SafeAreaView>
        </BackgroundLinear>
      );
    };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
  },
  textContainer: {
    flex: 4,
    justifyContent: 'flex-top',
    alignItems: 'center',
  },
  introductionText: {
    fontSize: 20,
    color: '#7B6F72',
    fontWeight: 'bold',
    marginBottom: '10%',
  },
});

export default SignUp2;
