import { Text, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';


function Todos({ route, navigation }) {
    const { username, email } = route.params;
    console.log(username, email);

    return (
        <View>
            <Text>Listing all todos</Text>
        </View>
    )
}

export default Todos