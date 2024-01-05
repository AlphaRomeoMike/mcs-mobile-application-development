import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import theme from "../constants/theme";
import { status, messages } from "../helpers/status_messages";
import * as _ from 'lodash';

const regexEmail = new RegExp("^[0-9A-Za-z._+]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$");
const regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

function Signup({ navigation }) {

  const [users, setUsers] = useState([]);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: ''
  });

  const get = async () => {
    const data = await AsyncStorage.getItem('user');
    return data?.length ? JSON.parse(data) : null;
  }

  useEffect(() => {
    const promise = get()

    promise.then((data) => {
      if (data != null) {
        const existingUsers = data.map(({ categories, ...rest }) => rest);
        console.log(10, existingUsers);
        existingUsers ? setUsers(existingUsers) : setUsers([]);
      }
    }).catch((err) => {
      console.log(err);
    });

  }, []);

  const handleLogin = () => {
    navigation.navigate('Login')
  }

  function validateEmail(email) {
    return regexEmail.test(email);
  }

  function validatePassword(password) {
    return regexPassword.test(password);
  }

  const handleSignup = async () => {
    if (!validateEmail(credentials.email) || !validatePassword(credentials.password)) {
      ToastAndroid.show(messages.INVALID_CREDENTIALS, ToastAndroid.SHORT);
      return;
    }

    if (checkExistingUsers(credentials.username, credentials.email)) {
      ToastAndroid.show(messages.ALREADY_EXISTS, ToastAndroid.SHORT);
      return;
    }

    await handleData(credentials);
  }

  const handleData = async (input) => {
    const users = get();

    users.then(async (list) => {
      console.log(20, list);

      list.push(input);

      await AsyncStorage.clear();

      await AsyncStorage.setItem('user', list);

      ToastAndroid.show(messages.SUCCESSFUL_ACTION, ToastAndroid.LONG);

      navigation.navigate('Login');
    });
  }

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