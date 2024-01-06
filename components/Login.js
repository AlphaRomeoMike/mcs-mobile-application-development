import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert, ToastAndroid } from "react-native";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as _ from 'lodash';

import theme from "@constants/theme";
import { messages, status } from "../helpers/status_messages";

const regex = "^[0-9A-Za-z._+]+@[A-Za-z0-9]+.[A-Za-z0-9]+$";
const { background, yellow, white, grey } = theme;

function Login({ navigation }) {

  const validateEmail = () => {
    return credentials.email.match(regex);
  }
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {
    if (!validateEmail()) {
      ToastAndroid.show(messages.INVALID_CREDENTIALS, ToastAndroid.SHORT)
    }
    const data = await getData();

    if (data.length) {
      let filter = data.filter((user) => {
        return user.email == credentials.email && user.password == credentials.password;
      });

      if (!_.isNil(filter)) {
        ToastAndroid.show(messages.SUCCESSFUL_ACTION, ToastAndroid.SHORT)
        filter = _.omit(filter, 'email');
        filter = _.omit(filter, 'password');
        let username = _.get(filter, 'username');

        navigation.navigate('Todos', {
          todoList: filter[0]['categories'],
          username: username
        });

      } else {
        Alert.alert(status.INVALID_CREDENTIALS, messages.INVALID_CREDENTIALS);

      }
    }
  }

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      return user != null ? JSON.parse(user) : null;
    } catch (error) {
      console.error(error);
    }
  }

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
        onPress={handleLogin}
        style={styles.loginButton}>
        <Text style={styles.loginText}>Login </Text>
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