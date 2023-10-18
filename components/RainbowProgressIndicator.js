import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

const RainbowProgressIndicator = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [animation]);

  const color = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'indigo',
      'purple',
    ],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor: color }]} />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default RainbowProgressIndicator;
