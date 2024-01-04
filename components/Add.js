import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert,Switch } from "react-native";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

import theme from "@constants/theme";

const { background, white, yellow , grey, accent } = theme;




function Add({ navigation }) {

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        // You can perform additional logic or actions here based on the new state
        // console.log(previousState)
      };
      const [isEnabled, setIsEnabled] = useState(false);


  return (
    <View style={{ alignItems: 'center', backgroundColor: background.toString(), height: '100%' }}>
      <Text style={{ color: white.toString(), padding: 50, fontSize: 30, fontWeight: "bold" }}>Create Todo</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Title'
          keyboardType="default"
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Category'
          keyboardType="default"
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        ></TextInput>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder='Description'
          secureTextEntry
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        ></TextInput>
        
      </View>
    <View style={styles.switchView}>
      <Text style={styles.switchLabel}>Completed</Text> 
      <Switch style={styles.switchi}
      trackColor={{ false: white.toString(), true: yellow.toString() }}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
    </View> 
     <Text>{isEnabled ? 'true' : 'false'}</Text>
      {/* <TouchableOpacity>
        <Text style={styles.forgot} onPress={handleSignUp}></Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        // onPress={handleLogin}
        style={styles.addTodoBtn}>
        <Text style={styles.addTodoText}>Add</Text>
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
  addTodoBtn: {
    width: "80%",
    backgroundColor: yellow.toString(),
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    marginBottom: 10
  },
  forgot: {
    color: white.toString()
  },
  addTodoText: {
    fontWeight: 'bold',
  },
  switchLabel:{
    color: white.toString(),
    marginTop:0,
    
  },
  switchView: {
    flexDirection: 'row', // Set to 'row' to align items horizontally
    alignItems: 'center', // Align items in the center vertically
    // justifyContent: 'center', // Align items in the center horizontally
    borderRadius: 5,
    height: 50,
    marginBottom: 20, 
    marginRight :206
  },
  switchi:{
  
  }
});

export default Add