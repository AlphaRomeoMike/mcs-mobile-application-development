import { StyleSheet, View } from 'react-native';

import Header from '@components/Header';
import { Login } from '@components/Login';


export default function App() {
  const title = 'Elastic Todo';
  return (
    <View style={styles.container}>
      <Header style={styles.header} title={title} />
      <Login title={title}></Login>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000814',
    justifyContent: 'center',
  },
  header: {
    color: '#f2e9e4',
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
