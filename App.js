import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login';
import colors from './constants/colors';

const Stack = createNativeStackNavigator();

const { primary, secondary, tertiary, accent, black } = colors

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{
          statusBarColor: primary,
          headerStyle: {backgroundColor: primary},
          headerTintColor: accent
          }}>
          <Stack.Screen name='Login ' component={Login} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App
