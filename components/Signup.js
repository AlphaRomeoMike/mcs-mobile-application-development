import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from "../constants/theme";
import { messages } from "../helpers/status_messages";
import * as _ from 'lodash';

// All required regular expressions
const regexEmail = new RegExp("^[0-9A-Za-z._+]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$");
const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function Signup({ navigation }) {

  // states to handle data in destructured form, in the state
  // first property is always the variable for the second param
  // that is the setter for that value, ensuring the the state
  // is never modified from anyother space
  const [users, setUsers] = useState([]);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: ''
  });

  /**
   * Get Data
   * ---
   * @name get
   * @param {void} - none
   * @description get all data and convert ot to JSON
   * @returns {Promise<any>}
   */
  const get = async () => {
    const data = await AsyncStorage.getItem('user');
    return data?.length ? JSON.parse(data) : null;
  }

  useEffect(() => {
    // use promise to resolve the get method beause 
    // it is asynchronous function
    const promise = get()

    promise.then((data) => {
      // state check for null data
      if (data != null) {
        // find existing users, destrcture the array,
        // removed extra information except the username, 
        // email, password
        const existingUsers = data.map(({ categories, ...rest }) => rest);
        // if users exist, update the users state variable 
        // using setter method
        existingUsers ? setUsers(existingUsers) : setUsers([]);
      }
    }).catch((err) => {
      console.log(err);
    });

  }, []);

  const handleLogin = () => {
    navigation.navigate('Login')
  }

  /**
   * # Validate Email
   * ---
   * @name validateEmail
   * @param {String} email - The user provided email
   * @returns {boolean} - true if value is valid else false
   */
  function validateEmail(email) {
    return regexEmail.test(email);
  }

  /**
   * # Validate Password
   * ---
   * @name validatePassword
   * @description Test user supplied password to match 
   * atleast one special character, atleast one number, 
   * upper and lower case alphabets
   * @param {String} password - The user provided password
   * @returns {boolean}
   */
  function validatePassword(password) {
    return regexPassword.test(password);
  }

  // Handle the signup functionality
  const handleSignup = async () => {
    // Validate email and password, else shows a toast and returns
    if (!validateEmail(credentials.email) || !validatePassword(credentials.password)) {
      ToastAndroid.show(messages.INVALID_CREDENTIALS, ToastAndroid.SHORT);
      return;
    }

    // Validate if users user exists in current users, else show toast and return
    if (checkExistingUsers(credentials.username, credentials.email)) {
      ToastAndroid.show(messages.ALREADY_EXISTS, ToastAndroid.SHORT);
      return;
    }

    // push the user information to the object
    await handleData(credentials);
  }

  const handleData = async (input) => {
    // get all users
    const users = get();

    // resolve promise to get list of data
    users.then(async (list) => {

      // push data to list
      list.push(input);

      // clear current state
      await AsyncStorage.clear();

      // set current item to the updated list with our user
      await AsyncStorage.setItem('user', JSON.stringify(list));

      // show toast
      ToastAndroid.show(messages.SUCCESSFUL_ACTION, ToastAndroid.LONG);

      // redirect to login
      handleLogin();
    });
  }

  /**
   * # Check existing user
   * ----
   * @description Check if user exists
   * @name checkExistingUsers
   * @param {String} username - The given username
   * @param {String} email - The given user email
   * @returns {Object|null}
   */
  function checkExistingUsers(username, email) {
    return users.find((user) => user.username === username || user.email === email);
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: background.toString() }}>
      <Text style={{ color: white.toString(), padding: 10, fontSize: 30, fontWeight: "bold" }}>Sign Up!</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Username'
          onChangeText={(text) => setCredentials({ ...credentials, username: text })}
        ></TextInput>
      </View>
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
        <Text style={styles.forgot} onPress={handleLogin}>Already have an account?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton} onPress={handleSignup}>
        <Text style={styles.signupText}>Signup </Text>
      </TouchableOpacity>
    </View>
  )
}

const { white, background, grey, yellow } = theme
const styles = StyleSheet.create({
  inputView: {
    width: "80%",
    backgroundColor: white.toString(),
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: background.toString()
  },
  forgotSignUpText: {
    color: grey.toString(),
    fontSize: 11
  },
  signUpButton: {
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
  signupText: {
    fontWeight: 'bold',
  }
});

export default Signup