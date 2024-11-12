// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import SplashScreen from '../screens/SplashScreen';
import Login from '../screens/Login';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false 
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
        />
        <Stack.Screen 
          name="Login" 
          component={Login}
        />
        <Stack.Screen 
          name="MainTabs" 
          component={BottomTabs}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}