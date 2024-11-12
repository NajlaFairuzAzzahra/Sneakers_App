import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const VALID_CREDENTIALS = {
    email: 'kiki@gmail.com',
    password: 'kikipoiu'
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        setIsLoading(false);
        navigation.replace('MainTabs');
      } else {
        setIsLoading(false);
        Alert.alert('Error', 'Invalid email or password');
      }
    }, 1500);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Background Image Section */}
        <View style={styles.backgroundImageContainer}>
          {isImageLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <Image
            source={{uri: 'https://images.unsplash.com/photo-1552346154-21d32810aba3'}}
            style={styles.backgroundImage}
            resizeMode="cover"
            onLoad={() => setIsImageLoading(false)}
          />
          <View style={styles.overlay} />
        </View>

        {/* Content Section */}
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.brandName}>SNEAKERS</Text>
            <Text style={styles.brandTagline}>Your Premium Sneaker Store</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <View style={isLoading ? styles.loadingButtonContainer : null}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>LOGIN</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
  },
  backgroundImage: {
    width: '100%',
    height: '115%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brandName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  brandTagline: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 40,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  inputContainer: {
    marginBottom: 25,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#eee',
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#666',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default Login;