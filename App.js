import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { updateState } from './utilities/helpers';

export default function App() {
  const title = 'Elastic Ecommerce';
  const [state, setState] = useState({
    email: '',
    password: ''
  });


  return (
    <View style={styles.container}>
      <Header style={styles.header} title={title} />
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
          onChangeText={(text) => setState(email = text)}
        ></TextInput>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    color: '#f2e9e4',
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  },
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
    color: "white"
  },
});
