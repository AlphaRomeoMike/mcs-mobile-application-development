import { FlatList, StyleSheet, View, Text, ScrollView } from 'react-native';

import Header from './components/Header';
import dishes from './data/dishes';


export default function App() {
  return (
    <View style={styles.container}>
      <Header customStyle={styles.header} />
      <ScrollView style={styles.types} horizontal={true}>{
        dishes.map((dish) => {
          return (
            <View>
              <Text style={styles.listItems}>{dish.cuisine}</Text>
            </View>
          )
        })
      }
      </ScrollView>

      <ScrollView style={styles.dishes}>
        {
          dishes.map((dish) => {
            return (
              <View>
                <Text>{
                    dish.dishes.map((item) => {
                      return (
                        <Text style={styles.dishItems}>{item.name}</Text>
                      )
                    })
                  }</Text>
              </View>
            )
          })
        }
      </ScrollView>
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
    height: 100,
    marginStart: 20,
    marginTop: 50,
    color: '#ccc',
    fontSize: 30

  },
  vehicles: {
    height: 30,
    width: 'auto',
    marginStart: 20,
    marginTop: 30
  },
  types: {
    color: '#ccc',
  },
  listItems: {
    color: '#ccc',
    marginStart: 20,
    padding: 10
  },
  dishes: {
    color: '#ccc',
    marginStart: 20,
    padding: 10
  },
  dishItems: {
    color: '#ccc',
  }
});
