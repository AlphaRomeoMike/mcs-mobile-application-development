import { Switch, Text, View } from "react-native"

import theme from "../constants/theme";

const { accent, yellow } = theme

function Todo({ navigation, todo }) {
    return (
        <View>
            <View style={{}}>
                <Text>{todo ?? todo.title}</Text>
                <Text>{todo ?? todo.description}</Text>
                <Text>{todo ?? todo.category}</Text>
                <Text><Switch
                    trackColor={{ false: accent.toString(), true: yellow.toString() }}
                    onValueChange={() => {}}
                ></Switch></Text>
            </View>
        </View>
    )
}

export default Todo