import { ScrollView, StyleSheet, Text, View } from 'react-native';


import cars from '../data/car'

function Car() {
  const styles = StyleSheet.create({
    listContainer: {
      fontSize: 30,
      padding: 5,
      marginStart: 10,
      marginTop: 15
    },
    listItemCar: {
      color: '#e5e5e5',
    },
    listItemDriver: {
      color: '#e5e5e5',
      borderBottomColor: '#e5e5e5',
    }
  })

  return (
    <ScrollView>
      {
        cars.map((car, index) => {
          return (
            <View style={styles.listContainer} key={index}>
              <Text style={styles.listItemCar}>{car.id}. {car.make} - {car.model} | {car.name}</Text>
              <Text style={styles.listItemDriver}>{car.driver.name} @ {car.driver.phone}</Text>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

export default Car