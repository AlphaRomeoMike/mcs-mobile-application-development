import { StyleSheet, View, Text } from "react-native"

export function Footer() {
  return (
    <View style={styles.body}>
      <Text style={styles.heading}>Please view details</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#e5e5e5',
    paddingStart: 20,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
})