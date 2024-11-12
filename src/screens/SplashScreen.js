// src/screens/SplashScreen.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const sneaker1Anim = useRef(new Animated.Value(-width)).current;
  const sneaker2Anim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(sneaker1Anim, {
          toValue: 0,
          tension: 5,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.spring(sneaker2Anim, {
          toValue: 0,
          tension: 5,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
    ]).start();


    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/splash2.png')}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" />
      
      <View style={styles.sneakersContainer}>
        <Animated.Image
          source={require('../../assets/patu1.png')}
          style={[
            styles.sneaker1,
            {
              opacity: fadeAnim,
              transform: [{ translateX: sneaker1Anim }]
            }
          ]}
          resizeMode="contain"
        />

        <Animated.Image
          source={require('../../assets/patu2.png')} 
          style={[
            styles.sneaker2,
            {
              opacity: fadeAnim,
              transform: [{ translateX: sneaker2Anim }]
            }
          ]}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  sneakersContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sneaker1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    top: '4%',
    right: 110,
  },
  sneaker2: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    top: '20%',
    right: -60,
  },
});

export default SplashScreen;