import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import { Footer } from './components/Footer';

export default function App() {

  const cars = [
    {
      id: 1,
      name: "Sedan A",
      make: "Toyota",
      model: "Camry",
      year: 2022,
      rating: 4.5
    },
    {
      id: 2,
      name: "SUV X",
      make: "Honda",
      model: "CR-V",
      year: 2021,
      rating: 4.7
    },
    {
      id: 3,
      name: "Compact B",
      make: "Ford",
      model: "Focus",
      year: 2023,
      rating: 4.2
    },
    // Add more cars as needed
  ];
  


  return (
    <View style={styles.container}>
      <Header style={styles.header}/>
      <ScrollView style={styles.vehicles}>
        {
          cars.map((car, index) => {
            return (
              <View style={styles.list_container}>
                <Text>{car.name}</Text>
              </View>
            )
          })
        }
      </ScrollView>
      <Footer />
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
  list_container: {
    color: '#e5e5e5',
    fontSize: 30,
    padding: 5
  }
});
