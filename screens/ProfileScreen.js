import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import RainbowProgressIndicator from '../../FrontendApp/components/RainbowProgressIndicator';
import WeightChart from '../components/WeightChart';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const weightData = [70, 72, 75, 73, 76, 78];

  useEffect(() => {
    // Replace 'https://api.example.com/api/user/profile' with your actual API endpoint
    axios
      .get('https://api.example.com/api/user/profile')
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CoolLoadingIndicator />;
  }

  if (!userData) {
    // Handle error case
    return <Text>Error loading user data</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: userData.profileImageUrl }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{userData.name}</Text>
      <Text style={styles.bio}>{userData.bio}</Text>
      <Text style={styles.goals}>{userData.goals}</Text>
      <WeightChart data={weightData} />
      {/* Add more components to display other user details */}
    </View>
  );
};

const CoolLoadingIndicator = () => {
  return (
    <View style={styles.loadingContainer}>
      <RainbowProgressIndicator />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    marginBottom: 8,
  },
  goals: {
    fontSize: 16,
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
});

export default ProfileScreen;
