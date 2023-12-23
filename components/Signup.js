import { View, TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useState } from "react";
import theme from "../constants/theme";

function Signup() {
  const [state, setState] = useState({
    email: '',
    password: '',
    username: ''
  });
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Username'
          onChangeText={(text) => setState(username = text)}
        ></TextInput>
      </View>
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
        <Text style={styles.forgot}>Already have an account?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}>
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
    borderRadius: 25,
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
    borderRadius: 25,
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