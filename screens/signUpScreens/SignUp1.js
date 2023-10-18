import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BackgroundLinear from '../../components/BackgroundLinear';
import LogoImage from '../../components/LogoImage';

const PasswordCriteria = ({ criteria, fulfilled }) => (
  <Text style={{ color: fulfilled ? '#2ecc71' : 'red' }}>
    {fulfilled ? '✓' : '✗'} {criteria}
  </Text>
);

const InputField = ({ placeholder, value, onChangeText, onBlur, secureTextEntry }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    onBlur={onBlur}
    secureTextEntry={secureTextEntry}
  />
);

const SignUp1 = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('');
    }
  };

  const handleNext = () => {
    validateEmail();
    validatePassword();

    // If no validation errors, proceed to the next screen or save data to the database
    if (!emailError && !passwordError) {
      // Save data to the database (you can implement this part)
      // Then, navigate to the next screen
      navigation.navigate('SignUp2', { name, email, password });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <BackgroundLinear>
        <SafeAreaView style={styles.container}>
          <LogoImage />
          <View style={styles.textContainer}>
            <Text style={styles.introductionText}>Please insert your Name, Email & Password</Text>
            <Text style={styles.subIntroductionText}>
              Name, email, and password are required for creating your account. Make sure your password meets the criteria mentioned below.
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <InputField placeholder="Name" value={name} onChangeText={setName} />
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              onBlur={validateEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <InputField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              onBlur={validatePassword}
              secureTextEntry
            />

          </View>
          <View style={styles.criteriaContainer}>
            <PasswordCriteria criteria="At least 8 characters" fulfilled={password.length >= 8} />
            <PasswordCriteria criteria="At least one uppercase letter" fulfilled={/[A-Z]/.test(password)} />
            <PasswordCriteria criteria="At least one lowercase letter" fulfilled={/[a-z]/.test(password)} />
            <PasswordCriteria criteria="At least one number" fulfilled={/\d/.test(password)} />
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </BackgroundLinear>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  criteriaContainer: {
    flex: 0.2,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  introductionText: {
    fontSize: 14,
    color: '#7B6F72',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  subIntroductionText: {
    fontSize: 10,
    color: '#7B6F72',
    marginBottom: '5%',
    textAlign: 'center',
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: 'white',
    marginBottom: '5%',
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 50,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default SignUp1;
