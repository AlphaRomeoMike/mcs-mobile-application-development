import { Text, View } from "react-native"

function Todo({ navigation, todo }) {
    return (
        <View>
            <View>
                <Text>{todo ?? todo.title}</Text>
                <Text>{todo ?? todo.description}</Text>
                <Text>{todo ?? todo.category}</Text>
                <Text>{todo ?? todo.status}</Text>
            </View>
        </View>
    )
}

export default Todo