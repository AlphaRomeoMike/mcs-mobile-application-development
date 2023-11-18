import { View, StyleSheet, Text } from "react-native";

function Header({customStyle}) {
  return (
    <View>
      <Text style={customStyle}>Open Recipes</Text>
    </View>
  )
}

export default Header;
