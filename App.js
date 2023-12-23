import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login';

const Stack = createNativeStackNavigator();

function App() {
  return (
    // <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name='Login' component={Login} />
    //     </Stack.Navigator>
    // </NavigationContainer>
    <Login />
  );
}

export default App
