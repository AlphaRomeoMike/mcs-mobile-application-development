import { StyleSheet, View } from 'react-native';

import Header from '@components/Header';
import Login from '@components/Login';
import Signup from '@components/Signup';
import theme from './constants/theme';


function App() {
  const title = 'Elastic Todo';
  return (
    <View style={styles.container}>
      <Header style={styles.header} title={title} />
      <Login></Login>
      {/* <Signup></Signup> */}
    </View>
  );
}

const { accent, background, white, body, highlight, support } = theme
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
