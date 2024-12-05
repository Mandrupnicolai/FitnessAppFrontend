import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundLinear from '../components/BackgroundLinear';
import WeightChart from '../components/WeightChart';

const QuickActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#3498db" />
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation, route }) => {
  const [userStats, setUserStats] = useState({
    name: '',
    streak: 0,
    nextWorkout: '',
    nextWorkoutTime: '',
    calorieGoal: 0,
    caloriesConsumed: 0,
    waterGoal: 0,
    waterConsumed: 0,
    weight: 0,
    goal: '',
  });

  useEffect(() => {
    // TODO: Fetch user data from backend
    // For now using mock data
    setUserStats({
      name: 'John',
      streak: 5,
      nextWorkout: "Upper Body",
      nextWorkoutTime: "Today, 6:00 PM",
      calorieGoal: 2500,
      caloriesConsumed: 1800,
      waterGoal: 8,
      waterConsumed: 5,
      weight: 75,
      goal: 'Build Muscle',
    });
  }, []);

  return (
    <BackgroundLinear>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Welcome back, {userStats.name}!</Text>
              <Text style={styles.streakText}>
                🔥 {userStats.streak} day streak
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => navigation.navigate('Profile')}
              style={styles.profileButton}
            >
              <Ionicons name="person-circle-outline" size={40} color="#3498db" />
            </TouchableOpacity>
          </View>

          {/* Next Workout Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Next Workout</Text>
            <Text style={styles.workoutName}>{userStats.nextWorkout}</Text>
            <Text style={styles.workoutTime}>{userStats.nextWorkoutTime}</Text>
            <TouchableOpacity 
              style={styles.startButton}
              onPress={() => navigation.navigate('Workouts')}
            >
              <Text style={styles.startButtonText}>Start Workout</Text>
            </TouchableOpacity>
          </View>

          {/* Daily Goals */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Daily Goals</Text>
            <View style={styles.goalRow}>
              <Ionicons name="flame-outline" size={24} color="#e74c3c" />
              <View style={styles.goalBar}>
                <View 
                  style={[
                    styles.goalProgress, 
                    { 
                      width: `${(userStats.caloriesConsumed / userStats.calorieGoal) * 100}%`,
                      backgroundColor: '#e74c3c' 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.goalText}>
                {userStats.caloriesConsumed}/{userStats.calorieGoal} cal
              </Text>
            </View>
            <View style={styles.goalRow}>
              <Ionicons name="water-outline" size={24} color="#3498db" />
              <View style={styles.goalBar}>
                <View 
                  style={[
                    styles.goalProgress, 
                    { 
                      width: `${(userStats.waterConsumed / userStats.waterGoal) * 100}%`,
                      backgroundColor: '#3498db' 
                    }
                  ]} 
                />
              </View>
              <Text style={styles.goalText}>
                {userStats.waterConsumed}/{userStats.waterGoal} glasses
              </Text>
            </View>
          </View>

          {/* Progress Chart */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weight Progress</Text>
            <WeightChart />
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <QuickActionButton 
              icon="add-circle-outline" 
              label="Log Weight"
              onPress={() => {/* TODO: Implement weight logging */}}
            />
            <QuickActionButton 
              icon="restaurant-outline" 
              label="Log Meal"
              onPress={() => {/* TODO: Implement meal logging */}}
            />
            <QuickActionButton 
              icon="water-outline" 
              label="Log Water"
              onPress={() => {/* TODO: Implement water logging */}}
            />
            <QuickActionButton 
              icon="barbell-outline" 
              label="New Workout"
              onPress={() => navigation.navigate('Workouts')}
            />
          </View>
        </ScrollView>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  streakText: {
    fontSize: 16,
    color: '#000000',
  },
  profileButton: {
    marginRight: 5, // Added 5px margin to move button left
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  workoutTime: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  goalBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  goalProgress: {
    height: '100%',
    borderRadius: 5,
  },
  goalText: {
    fontSize: 14,
    color: '#000000',
    width: 100,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionLabel: {
    marginTop: 5,
    color: '#000000',
    fontSize: 14,
  },
});

export default HomeScreen;
