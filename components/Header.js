import { View, StyleSheet, Text } from "react-native";

function Header({style, title}) {
  return (
    <View>
      <Text style={style}>{title}</Text>
    </View>
  )
}

export default Header;
