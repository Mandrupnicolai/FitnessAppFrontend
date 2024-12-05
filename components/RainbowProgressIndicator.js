import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RainbowProgressIndicator = ({ progress = 0 }) => {
  // Ensure progress is between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  
  // Calculate the width of the progress bar
  const width = `${clampedProgress * 100}%`;

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={[styles.progressBar, { width }]}>
          <LinearGradient
            colors={['#3498db', '#2ecc71']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  background: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
  },
});

export default RainbowProgressIndicator;
