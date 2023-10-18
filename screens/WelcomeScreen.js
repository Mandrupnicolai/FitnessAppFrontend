import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import BackgroundLinear from '../components/BackgroundLinear';
import LogoImage from '../components/LogoImage';

const WelcomeScreen = ({ navigation }) => {
  return (
    <BackgroundLinear>
    <SafeAreaView style={styles.container}>
      <LogoImage></LogoImage>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText} accessibilityLabel='Welcome to Your Fitness App'>Welcome to Your Fitness App!</Text>
            </View>
            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                style={[styles.button, styles.signupButton]}
                onPress={() => navigation.navigate('SignUp1')}>
                <Text style={styles.buttonText} accessibilityLabel='Sign Up'>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText} accessibilityLabel='Log In'>Log In</Text>
              </TouchableOpacity>
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
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttoncontainer:{
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '25%',
  },
  welcomeText: {
    fontSize: 20,
    color: '#7B6F72',
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: '30%',
    borderRadius: 25,
    marginBottom: '5%',
    alignSelf: 'center', 
    shadowOpacity: 0.2,
  },
  signupButton: {
    backgroundColor: '#3498db',
    shadowColor: '#3498db',
  },
  loginButton: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: '35%',
    shadowColor: '#2ecc71',
  },
  buttonText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    shadowOpacity: 0.3,
  },
});

export default WelcomeScreen;
