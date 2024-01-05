import { StyleSheet, View } from 'react-native';

import Login from '@components/Login';
import Signup from '@components/Signup';
import theme from '@constants/theme';
import Todos from '@components/Todos';
import Add from '@components/Add';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from './helpers/data';

const Stack = createNativeStackNavigator();

const { accent, background, white, lightyellow, yellow, support } = theme;

function App() {
  const title = 'Elastic Todo';
  useEffect(() => {
    const set = async () => {
      if (__DEV__) {
        let d = await AsyncStorage.getItem('data');
        console.log(data);
        if (!d) {
          await AsyncStorage.setItem('data', JSON.stringify(data))
          console.log(`Seeding Completed!`);
        } else {
          console.log(`Data already exists`);
        }
      }
    }
    set();
  })
  return (
    <NavigationContainer >
      <View style={styles.container}>
        <Stack.Navigator initialRouteName='Add' screenOptions={{
          statusBarColor: background,
          headerStyle: {backgroundColor: background},
          headerTintColor: white
          }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Todos" component={Todos} />
          <Stack.Screen name="Add" component={Add} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {  
    flex: 1,
    backgroundColor: background.toString(),
    justifyContent: 'center',
  },
  header: {
    color: white.toString(),
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default App
