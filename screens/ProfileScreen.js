import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundLinear from '../components/BackgroundLinear';
import WeightChart from '../components/WeightChart';

const ProfileScreen = ({ navigation }) => {
  // Mock user data - In real app, this would come from a backend
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    height: 180,
    weight: 75,
    age: 28,
    trainingFrequency: 4,
    activityLevel: 'Active',
    goal: 'Build Muscle',
    streak: 5,
    totalWorkouts: 48,
    achievements: [
      { id: 1, name: 'First Workout', icon: '🎯', description: 'Completed your first workout' },
      { id: 2, name: '5 Day Streak', icon: '🔥', description: 'Worked out for 5 days in a row' },
      { id: 3, name: 'Weight Goal', icon: '⚖️', description: 'Reached your first weight goal' },
    ]
  });

  const StatBox = ({ label, value, icon }) => (
    <View style={styles.statBox}>
      <Ionicons name={icon} size={24} color="#3498db" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const SettingItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={24} color="#7B6F72" />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#7B6F72" />
    </TouchableOpacity>
  );

  return (
    <BackgroundLinear>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.header}>
            <View style={styles.profileImageContainer}>
              <Ionicons name="person-circle" size={80} color="#3498db" />
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="pencil" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>

          {/* Stats Overview */}
          <View style={styles.statsContainer}>
            <StatBox label="Workouts" value={userData.totalWorkouts} icon="barbell-outline" />
            <StatBox label="Streak" value={userData.streak} icon="flame-outline" />
            <StatBox label="Weight" value={`${userData.weight}kg`} icon="scale-outline" />
          </View>

          {/* Progress Chart */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Weight Progress</Text>
            <WeightChart />
          </View>

          {/* Achievements */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Achievements</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {userData.achievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={styles.achievementName}>{achievement.name}</Text>
                  <Text style={styles.achievementDesc}>{achievement.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Settings */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Settings</Text>
            <SettingItem 
              icon="person-outline" 
              label="Edit Profile"
              onPress={() => {/* TODO: Navigate to edit profile */}}
            />
            <SettingItem 
              icon="notifications-outline" 
              label="Notifications"
              onPress={() => {/* TODO: Navigate to notifications settings */}}
            />
            <SettingItem 
              icon="fitness-outline" 
              label="Goals"
              onPress={() => {/* TODO: Navigate to goals settings */}}
            />
            <SettingItem 
              icon="shield-outline" 
              label="Privacy"
              onPress={() => {/* TODO: Navigate to privacy settings */}}
            />
            <SettingItem 
              icon="log-out-outline" 
              label="Logout"
              onPress={() => navigation.navigate('Welcome')}
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
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#3498db',
    borderRadius: 15,
    padding: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#7B6F72',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#7B6F72',
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
    color: '#2c3e50',
    marginBottom: 15,
  },
  achievementCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    width: 150,
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 12,
    color: '#7B6F72',
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#2c3e50',
    marginLeft: 15,
  },
});

export default ProfileScreen;
