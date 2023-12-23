import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";


/**
 * @description The useState variable
 * @param {Object} param0 
 * @returns 
 */
function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (value) => {
    setEmail(value);
  }

  const handlePassword = (value) => {
    setPassword(value);
  }

  const handleLogin = () => {
    navigation.navigate('Details');
  } 

  return (
    <View style={[styles.container, styles.inputText]}>
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontStyle: 'italic' }}>Email</Text>
        <TextInput
          placeholder="Please enter email"
          keyboardType="email-address"
          onChangeText={handleEmail}
          value={email}
        />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text>Passowrd</Text>
        <TextInput
          placeholder="Please enter password"
          keyboardType="default"
          secureTextEntry
          onChangeText={handlePassword}
          value={password}
        />
      </View>

      <Pressable style={{ marginTop: 30 }} onPress={handleLogin}>
        <Text style={{}}>
          Login
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 30,
    padding: 30,
    backgroundColor: 'white',
    height: '100%'
  },
  inputText: {

  }
});

export default Login;