import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundLinear from '../components/BackgroundLinear';

const WorkoutScreen = ({ navigation }) => {
  const [workoutDays, setWorkoutDays] = useState([
    { id: '1', name: 'Upper Body 1', exercises: [] },
    { id: '2', name: 'Lower Body 1', exercises: [] },
    { id: '3', name: 'Push Day', exercises: [] },
    { id: '4', name: 'Pull Day', exercises: [] },
    { id: '5', name: 'Legs Day', exercises: [] },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');

  const handleAddWorkout = () => {
    if (newWorkoutName.trim()) {
      const newWorkout = {
        id: Date.now().toString(),
        name: newWorkoutName.trim(),
        exercises: [],
      };
      setWorkoutDays([...workoutDays, newWorkout]);
      setNewWorkoutName('');
      setIsModalVisible(false);
    }
  };

  const renderWorkoutDay = ({ item }) => (
    <TouchableOpacity 
      style={styles.workoutCard}
      onPress={() => navigation.navigate('WorkoutDetail', { workout: item })}
    >
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.exerciseCount}>
          {item.exercises.length} exercises
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#7B6F72" />
    </TouchableOpacity>
  );

  return (
    <BackgroundLinear>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Workouts</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ New Workout</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={workoutDays}
          renderItem={renderWorkoutDay}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.workoutList}
          showsVerticalScrollIndicator={false}
        />

        {/* Add Workout Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create New Workout</Text>
              <TextInput
                style={styles.input}
                placeholder="Workout Name"
                value={newWorkoutName}
                onChangeText={setNewWorkoutName}
                autoFocus
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => {
                    setIsModalVisible(false);
                    setNewWorkoutName('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.createButton]}
                  onPress={handleAddWorkout}
                >
                  <Text style={styles.createButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </BackgroundLinear>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  workoutList: {
    paddingBottom: 20,
  },
  workoutCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  exerciseCount: {
    color: '#7B6F72',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
  },
  createButton: {
    backgroundColor: '#3498db',
  },
  cancelButtonText: {
    color: '#2c3e50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WorkoutScreen;
