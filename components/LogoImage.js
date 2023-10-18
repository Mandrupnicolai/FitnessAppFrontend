import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoImage = ({ children }) => {
  return (
    <View style={styles.logoContainer}>
    <Image source={require('../assets/LogoAppNoBG.png')} style={styles.logo} />
  </View>
);
};

const styles = StyleSheet.create({
    logoContainer: {
        flex: 1,
        justifyContent: 'flex-top',
        alignItems: 'center',
        top: '5%',
    },
    logo: {
        width: 80,
        height: 80,
    },
})

export default LogoImage;