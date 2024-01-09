import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert, ToastAndroid } from "react-native";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as _ from 'lodash';

import theme from "@constants/theme";
import { messages, status } from "../helpers/status_messages";

const regex = RegExp("^[0-9A-Za-z._+]+@[A-Za-z0-9]+.[A-Za-z0-9]+$");
const { background, yellow, white, grey } = theme;

function Login({ navigation }) {

  /**
   * # Validate Email
   * ---
   * @description - validate email
   * @returns {Boolean}
   */
  const validateEmail = () => {
    return credentials.email.match(regex);
  }

  // stateHook for credentials
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  /**
   * # Handle Login
   * ---
   * @description - Handle the login functionality  
   * @name - handleLogin
   * @async
   * @returns {void}
   */
  const handleLogin = async () => {
    if (!validateEmail()) {
      ToastAndroid.show(messages.INVALID_CREDENTIALS, ToastAndroid.SHORT);
      return;
    }
  
    try {
      // retreive data from storage
      const data = await getData();
  
      // null check for data
      if (data && data.length) {

        // filter data for current user
        let filter = data.filter((user) => {
          return user.email == credentials.email && user.password == credentials.password;
        });

        // filter success
        if (filter && filter.length) {
          // show toast that user has logged in
          ToastAndroid.show(messages.SUCCESSFUL_ACTION, ToastAndroid.SHORT);

          // remove unnesecarry information
          filter = _.omit(filter, 'email');
          filter = _.omit(filter, 'password');

          // retrieve user information
          let username = _.get(filter, '[0].username');

          // navigate to Todos screen
          navigation.navigate('Todos', {
            todoList: filter[0]['categories'],
            username: username
          });

        } else {
          Alert.alert(status.INVALID_CREDENTIALS, messages.INVALID_CREDENTIALS);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * # Get Data
   * ---
   * @description - get data from storage and return 
   * the details as JSON
   * @name getData
   * @returns {JSON|null} 
   */
  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      return user != null ? JSON.parse(user) : null;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * # Handle Signup
   * ---
   * @name - handleSignUp
   * @param {void}
   * @description - handle signup
   */
  const handleSignUp = () => {
    navigation.navigate('Signup');
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: background.toString(), height: '100%' }}>
      <Text style={{ color: white.toString(), padding: 10, fontSize: 30, fontWeight: "bold" }}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Email'
          keyboardType="email-address"
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Password'
          secureTextEntry
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        ></TextInput>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot} onPress={handleSignUp}>Signup instead?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {await handleLogin()}}
        style={styles.loginButton}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputView: {
    width: "80%",
    backgroundColor: white.toString(),
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: background.toString()
  },
  forgotSignUpText: {
    color: grey.toString(),
    fontSize: 11
  },
  loginButton: {
    width: "80%",
    backgroundColor: yellow.toString(),
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  forgot: {
    color: white.toString()
  },
  loginText: {
    fontWeight: 'bold',
  }
});

export default Login