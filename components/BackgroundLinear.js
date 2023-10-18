import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const BackgroundLinear = ({ children }) => {
  return (
    <LinearGradient
      colors={['#3498db', '#9DCEFF']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: '10%' }}>
      {children}
    </LinearGradient>
  );
};

export default BackgroundLinear;
