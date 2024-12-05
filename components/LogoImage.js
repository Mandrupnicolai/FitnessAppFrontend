import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const LogoImage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/LogoAppNoBG.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default LogoImage;
