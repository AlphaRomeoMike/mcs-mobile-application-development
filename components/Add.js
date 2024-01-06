import { View, StyleSheet, TouchableOpacity, Text, TextInput, Alert, Switch } from "react-native";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import theme from "@constants/theme";

const { background, white, yellow, grey, accent } = theme;

function Add({route,navigation }) {
    const username = route?.params?.username ? route?.params.username : 'Expo'
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
            setTodo({ ...todo, completed: isEnabled });
        // You can perform additional logic or actions here based on the new state
        // console.log(previousState)
    };
    const [todo, setTodo] = useState({
        title: '',
        category: '',
        description: '',
        completed:isEnabled
      });

   
    const AddTodo = async () => {
        try {
          const dataString = await AsyncStorage.getItem('data');
          if (dataString) {
            const data = JSON.parse(dataString);
      
            if (username) {
              console.log(username + " username");
              let user = data.find((item) => item.username === username);
              
              if (user) {
                console.log("enter");
      
                let category = user.categories.find((category) => category.name === todo.category);
      
                if (!category) {
                  console.log("zzz");
                  // Create a new category if it doesn't exist
                  user.categories.push({
                    name: todo.category,
                    data: [{
                      title: todo.title,
                      description: todo.description,
                      completed: todo.completed,
                    }],
                  });
                } else {
                  // Add new data to the existing category
                  category.data.push({
                    title: todo.title,
                    description: todo.description,
                    completed: todo.completed,
                  });
                }
      
                // Log the updated data
                console.log(JSON.stringify(data)+"final");
      
                // Update AsyncStorage with the modified data
                await AsyncStorage.setItem('data', JSON.stringify(data));
              }
            }
          } else {
            console.log("Data is empty or undefined");
          }
      
          // Continue with your logic...
        } catch (error) {
          console.error(error);
        }
      };
      

      const getData = async () => {
        try {
            console.log(JSON.stringify(todo) + " ob");
            const todoData = todo
            return todoData;
            // return user != null ? JSON.parse(user) : null;
          } catch (error) {
            console.error(error);
          }
       
      }

    return (
        <View style={{ alignItems: 'center', backgroundColor: background.toString(), height: '100%' }}>
            <Text style={{ color: white.toString(), padding: 50, fontSize: 30, fontWeight: "bold" }}>Create Todo</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Title'
                    keyboardType="default"
                    onChangeText={(text) => {setTodo({ ...todo, title: text }); console.log(todo)}}
                ></TextInput>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Category'
                    keyboardType="default"
                    onChangeText={(text) => setTodo({ ...todo, category: text })}
                ></TextInput>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Description'
                    keyboardType="default"
                    onChangeText={(text) => setTodo({ ...todo, description: text })}
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
            <TouchableOpacity
                onPress={AddTodo}
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
        marginTop: 0,
        marginBottom: 10
    },
    forgot: {
        color: white.toString()
    },
    addTodoText: {
        fontWeight: 'bold',
    },
    switchLabel: {
        color: white.toString(),
        marginTop: 0,

    },
    switchView: {
        flexDirection: 'row', // Set to 'row' to align items horizontally
        alignItems: 'center', // Align items in the center vertically
        borderRadius: 5,
        height: 50,
        marginBottom: 20,
        marginRight: 206
    },
    switchi: {

    }
});

export default Add