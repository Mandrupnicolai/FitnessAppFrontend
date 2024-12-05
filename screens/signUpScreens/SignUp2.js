import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BackgroundLinear from '../../components/BackgroundLinear';
import LogoImage from '../../components/LogoImage';

const SignUp2 = ({ route, navigation }) => {
  const { name, email, password } = route.params;
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [trainingFrequency, setTrainingFrequency] = useState('3');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');

  const handleSubmit = async () => {
    if (!height || !weight || !age) {
      alert('Please fill in all required fields');
      return;
    }

    const userData = {
      name,
      email,
      password,
      height: parseFloat(height),
      weight: parseFloat(weight),
      age: parseInt(age),
      trainingFrequency: parseInt(trainingFrequency),
      activityLevel,
      goal,
    };

    try {
      // TODO: Implement API call to create user
      // For now, just navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } catch (error) {
      alert('Error creating account. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <BackgroundLinear>
        <SafeAreaView style={styles.container}>
          <LogoImage />
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Almost there!</Text>
            <Text style={styles.subtitleText}>
              Let's get to know you better to personalize your fitness journey
            </Text>
          </View>

          <View style={styles.formContainer}>
            <InputField
              label="Height (cm)"
              placeholder="Enter your height"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />

            <InputField
              label="Weight (kg)"
              placeholder="Enter your weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />

            <InputField
              label="Age"
              placeholder="Enter your age"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
            />

            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Training Frequency (days per week)</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={trainingFrequency}
                  onValueChange={(value) => setTrainingFrequency(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                    <Picker.Item 
                      key={num} 
                      label={num.toString()} 
                      value={num.toString()}
                      color="#000000"
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Activity Level</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={activityLevel}
                  onValueChange={(value) => setActivityLevel(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Sedentary" value="sedentary" color="#000000" />
                  <Picker.Item label="Light Activity" value="light" color="#000000" />
                  <Picker.Item label="Moderate Activity" value="moderate" color="#000000" />
                  <Picker.Item label="Very Active" value="active" color="#000000" />
                  <Picker.Item label="Extra Active" value="extra_active" color="#000000" />
                </Picker>
              </View>
            </View>

            <View style={styles.pickerWrapper}>
              <Text style={styles.label}>Fitness Goal</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={goal}
                  onValueChange={(value) => setGoal(value)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  <Picker.Item label="Maintain Weight" value="maintain" color="#000000" />
                  <Picker.Item label="Lose Weight" value="lose" color="#000000" />
                  <Picker.Item label="Gain Weight" value="gain" color="#000000" />
                  <Picker.Item label="Build Muscle" value="build" color="#000000" />
                  <Picker.Item label="Improve Endurance" value="endurance" color="#000000" />
                </Picker>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </BackgroundLinear>
    </ScrollView>
  );
};

const InputField = ({ label, placeholder, value, onChangeText, keyboardType = 'default' }) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor="#666666"
    />
  </View>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerWrapper: {
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  picker: {
    height: 60,
    width: '100%',
  },
  pickerItem: {
    fontSize: 16,
    height: 60,
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUp2;
