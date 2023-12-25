import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import theme from "../constants/theme";
import { status, messages } from "../helpers/status_messages";

const regex = new RegExp("^[0-9A-Za-z._+]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$");

function Signup({ navigation }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    username: ''
  });

  const handleLogin = () => {
    navigation.navigate('Login')
  }

  const handleSignup = async () => {
    console.log(credentials.email);
    if (!regex.test(credentials.email)) {
      Alert.alert('Invalid Email', 'Please provide a valid email');
    }

    await handleData(credentials);
  }

  const handleData = async (data) => {
    try {
      data = JSON.stringify(data)
      user = await AsyncStorage.setItem('user', data)
      if (!user) {
        Alert.alert(status.SOMETHING_WENT_WRONG, messages.SOMETHING_WENT_WRONG);
      }
      Alert.alert(status.SUCCESSFUL_ACTION, status.SUCCESSFUL_ACTION);
    } catch (err) {
      console.error(err)
    }
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