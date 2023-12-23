import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import Login from './components/Login';

export default function App() {
  return (
    <NavigationContainer>
      <View>
        <Login />
      </View>
    </NavigationContainer>
  );
}
