import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { useState } from 'react';
import theme from "@constants/theme";

const regex_email = "^[0-9A-Za-z._+]+@[A-Za-z0-9]+.[A-Za-z0-9]+$";

export function Login() {

  const validateEmail = () => {
    return state.email.match(regex_email);
  }
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const handleLogin = () => {
    if (!validateEmail && !state.password.length) {
      Alert.alert('Please provide a valid email and password');
    }
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Email'
          keyboardType="email-address"
          onChangeText={(text) => setState(email = text)}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Password'
          secureTextEntry
          onChangeText={(text) => setState(password = text)}
        ></TextInput>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}>
        <Text style={styles.loginText}>Login </Text>
      </TouchableOpacity>
    </View>
  )
}

const { background, accent, support, highlight, body, white } = theme;
const styles = StyleSheet.create({
  inputView: {
    width: "80%",
    backgroundColor: white.toString(),
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgotSignUpText: {
    color: "#f2e9e4",
    fontSize: 11
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#fca311",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  forgot: {
    color: '#e5e5e5'
  },
  loginText: {
    fontWeight: 'bold',
  }
})