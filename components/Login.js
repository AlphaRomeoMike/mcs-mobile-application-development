// Import necessary components and modules from React Native and other sources
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as _ from 'lodash';

// Import custom constants and helpers
import theme from '@constants/theme';
import { auth } from '../helpers/keys';
import { messages, status } from '../helpers/status_messages';
import arr from '../helpers/data';

// Define a regular expression for email validation
const regex = '^[0-9A-Za-z._+]+@[A-Za-z0-9]+.[A-Za-z0-9]+$';
const { background, yellow, white, grey } = theme;

function Login({ navigation }) {
  // Function to validate email using regex
  const validateEmail = () => {
    return credentials.email.match(regex);
  };

  // State to manage user credentials
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Function to handle the login process
  const handleLogin = async () => {
    // Validate email format
    if (!validateEmail()) {
      Alert.alert(status.INVALID_CREDENTIALS, messages.INVALID_CREDENTIALS);
    }

    // Get user data from AsyncStorage
    const data = await getData();

    if (data.length) {
      // Filter user data based on entered email and password
      let filter = data.filter((user) => {
        return user.email == credentials.email && user.password == credentials.password;
      });

      if (!_.isNil(filter)) {
        // If credentials match, navigate to Todos screen with user data
        Alert.alert(status.SUCCESSFUL_ACTION, messages.SUCCESSFUL_ACTION);
        filter = _.omit(filter, 'email');
        filter = _.omit(filter, 'password');
        navigation.navigate('Todos', {
          todoList: filter,
        });
      } else {
        // If credentials don't match, show invalid credentials alert
        Alert.alert(status.INVALID_CREDENTIALS, messages.INVALID_CREDENTIALS);
      }
    }
  };

  // Function to get user data from AsyncStorage
  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem(auth.user);
      return user != null ? JSON.parse(user) : null;
    } catch (error) {
      console.error(error);
    }
  };

  // Function to navigate to the Signup screen
  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  // JSX structure for the Login screen
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: background.toString(), height: '100%' }}>
      <Text style={{ color: white.toString(), padding: 10, fontSize: 30, fontWeight: 'bold' }}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        ></TextInput>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot} onPress={handleSignUp}>Signup instead?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the Login component
const styles = StyleSheet.create({
  inputView: {
    width: '80%',
    backgroundColor: white.toString(),
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: background.toString(),
  },
  forgotSignUpText: {
    color: grey.toString(),
    fontSize: 11,
  },
  loginButton: {
    width: '80%',
    backgroundColor: yellow.toString(),
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  forgot: {
    color: white.toString(),
  },
  loginText: {
    fontWeight: 'bold',
  },
});

export default Login;
