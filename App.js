import { StyleSheet, View } from 'react-native';

import Login from '@components/Login';
import Signup from '@components/Signup';
import theme from '@constants/theme';
import Todos from '@components/Todos';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const { accent, background, white, lightyellow, yellow, support } = theme;

function App() {
  const title = 'Elastic Todo';
  return (
    <NavigationContainer >
      <View style={styles.container}>
        <Stack.Navigator initialRouteName='Login' screenOptions={{
          statusBarColor: background,
          headerStyle: {backgroundColor: background},
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
