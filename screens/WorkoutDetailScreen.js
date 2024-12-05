import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundLinear from '../components/BackgroundLinear';

const ExerciseItem = ({ exercise, onEdit, onDelete }) => (
  <View style={styles.exerciseItem}>
    <View style={styles.exerciseInfo}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.exerciseDetails}>
        {exercise.sets} sets × {exercise.reps} reps • {exercise.weight}kg
      </Text>
    </View>
    <View style={styles.exerciseActions}>
      <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
        <Ionicons name="pencil" size={20} color="#3498db" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
        <Ionicons name="trash-outline" size={20} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  </View>
);

const WorkoutDetailScreen = ({ route, navigation }) => {
  const [exercises, setExercises] = useState([
    { id: '1', name: 'Bench Press', sets: 3, reps: 10, weight: 60 },
    { id: '2', name: 'Shoulder Press', sets: 3, reps: 12, weight: 40 },
    { id: '3', name: 'Tricep Extensions', sets: 3, reps: 15, weight: 25 },
  ]);

  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
  });

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.sets && newExercise.reps && newExercise.weight) {
      setExercises([
        ...exercises,
        {
          id: Date.now().toString(),
          ...newExercise,
          sets: parseInt(newExercise.sets),
          reps: parseInt(newExercise.reps),
          weight: parseInt(newExercise.weight),
        },
      ]);
      setNewExercise({ name: '', sets: '', reps: '', weight: '' });
      setIsAddingExercise(false);
    }
  };

  const handleDeleteExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <BackgroundLinear>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2c3e50" />
          </TouchableOpacity>
          <Text style={styles.title}>Upper Body Workout</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#2c3e50" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Exercise List */}
          <View style={styles.exerciseList}>
            {exercises.map((exercise) => (
              <ExerciseItem
                key={exercise.id}
                exercise={exercise}
                onEdit={() => {/* TODO: Implement edit */}}
                onDelete={() => handleDeleteExercise(exercise.id)}
              />
            ))}
          </View>

          {/* Add Exercise Form */}
          {isAddingExercise ? (
            <View style={styles.addExerciseForm}>
              <TextInput
                style={styles.input}
                placeholder="Exercise Name"
                value={newExercise.name}
                onChangeText={(text) => setNewExercise({ ...newExercise, name: text })}
              />
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, styles.smallInput]}
                  placeholder="Sets"
                  keyboardType="numeric"
                  value={newExercise.sets}
                  onChangeText={(text) => setNewExercise({ ...newExercise, sets: text })}
                />
                <TextInput
                  style={[styles.input, styles.smallInput]}
                  placeholder="Reps"
                  keyboardType="numeric"
                  value={newExercise.reps}
                  onChangeText={(text) => setNewExercise({ ...newExercise, reps: text })}
                />
                <TextInput
                  style={[styles.input, styles.smallInput]}
                  placeholder="Weight (kg)"
                  keyboardType="numeric"
                  value={newExercise.weight}
                  onChangeText={(text) => setNewExercise({ ...newExercise, weight: text })}
                />
              </View>
              <View style={styles.formButtons}>
                <TouchableOpacity 
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => setIsAddingExercise(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.addButton]}
                  onPress={handleAddExercise}
                >
                  <Text style={styles.addButtonText}>Add Exercise</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addExerciseButton}
              onPress={() => setIsAddingExercise(true)}
            >
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text style={styles.addExerciseText}>Add Exercise</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        {/* Start Workout Button */}
        <TouchableOpacity style={styles.startWorkoutButton}>
          <Text style={styles.startWorkoutText}>Start Workout</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  exerciseList: {
    marginBottom: 20,
  },
  exerciseItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#7B6F72',
  },
  exerciseActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 5,
    marginLeft: 10,
  },
  addExerciseButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addExerciseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  addExerciseForm: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    width: '30%',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
  },
  addButton: {
    backgroundColor: '#3498db',
  },
  cancelButtonText: {
    color: '#2c3e50',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  startWorkoutButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startWorkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutDetailScreen;
