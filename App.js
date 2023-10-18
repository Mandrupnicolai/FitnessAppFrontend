import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUp1 from './screens/signUpScreens/SignUp1';
import SignUp2 from './screens/signUpScreens/SignUp2';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SignUp1" 
        screenOptions={{headerShown: false,
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name='SignUp1' component={SignUp1}/>
        <Stack.Screen name='SignUp2' component={SignUp2}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
