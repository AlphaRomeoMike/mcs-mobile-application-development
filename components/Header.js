import { View, StyleSheet, Text } from "react-native";

function Header() {
  return (
    <View>
      <Text style={style.heading}>Baham</Text>
    </View>
  )
}

const style = StyleSheet.create({
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fca311',
    paddingStart: 20,
    paddingTop: 40,
  },
  container: {
    flex: 1,
    margin: 20
  }
});

export default Header;
