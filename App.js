import { StyleSheet, View } from 'react-native';

import Login from '@components/Login';
import Signup from '@components/Signup';
import theme from '@constants/theme';
import Todos from '@components/Todos';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from './helpers/data';
const Stack = createNativeStackNavigator();

const { accent, background, white, lightyellow, yellow, support } = theme;

function App() {

  useEffect(() => {
    let seed = async () => {
      if (__DEV__) {
        let prop = await AsyncStorage.getItem('user');
        if (!prop) {
          await AsyncStorage.setItem('user', JSON.stringify({ username: "Expo", email: "expo@example.com", password: "Pa$$w0rd" }));
          await AsyncStorage.setItem('user_todos', JSON.stringify(data));

          console.log(`Seeding completed`);
        }
      }
    }

    seed()
  });

  const title = 'Elastic Todo';
  return (
    <NavigationContainer >
      <View style={styles.container}>
        <Stack.Navigator initialRouteName='Login' screenOptions={{
          statusBarColor: background,
          headerStyle: { backgroundColor: background },
          headerTintColor: white
        }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Todos" component={Todos} />
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
