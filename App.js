import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import Car from './components/Car'


export default function App() {
  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      <Car style={styles.car}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#14213d',
    justifyContent: 'space-between',
    height: 100,
    flex: 1,
  },
  header: {
    height: 100
  },
  vehicles: {
    height: 30,
    width: 'auto',
    marginStart: 20,
    marginTop: 30
  },
  car: {
    marginStart: 10
  }
});
