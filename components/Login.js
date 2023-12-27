import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import theme from "@constants/theme";
import { auth } from "../helpers/keys";
import { messages, status } from "../helpers/status_messages";

const regex = "^[0-9A-Za-z._+]+@[A-Za-z0-9]+.[A-Za-z0-9]+$";
const { background, yellow, white, grey } = theme;

function Login({ navigation }) {
  
  const validateEmail = () => {
    return credentials.email.match(regex);
  }
  const [credentials, setcredentials] = useState({
    email: '',
    password: ''
  });
  
  const handleLogin = async () => {
    if (!validateEmail() || !state.password.length) {
      Alert.alert(status.INVALID_CREDENTIALS,messages.INVALID_CREDENTIALS);
    } else {
    const {email, password, username} = await getData();

    if (email == credentials.email || password == credentials.password) {
      Alert.alert(status.SUCCESSFUL_ACTION, messages.SUCCESSFUL_ACTION);
      navigation.navigate('Todos', {
        username,
        email
      });
    }
  }
   

  
  }

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem(auth.user);
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
      <Text style={{color: white.toString(), padding: 10, fontSize: 30, fontWeight: "bold"}}>Elastic Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Email'
          keyboardType="email-address"
          onChangeText={(text) => setcredentials({ ...credentials, email: text})}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Password'
          secureTextEntry
          onChangeText={(text) => setcredentials({ ...credentials, password: text})}
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