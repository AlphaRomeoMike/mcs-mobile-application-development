import { View, StyleSheet, TouchableOpacity, Text, TextInput } from "react-native";

export function Login({ style }) {
  console.log(style);
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Email'
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
        style={styles.loginButton}>
        <Text style={styles.loginText}>Login </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputView: {
    width: "80%",
    backgroundColor: "#e5e5e5",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "#f2e9e4"
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
  }
})