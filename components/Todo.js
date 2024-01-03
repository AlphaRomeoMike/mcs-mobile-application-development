import { StyleSheet, Switch, Text, View } from "react-native"

import theme from "../constants/theme";

const { accent, yellow } = theme

function Todo({ todo }) {
    return (
        <View>
            <View style={{}}>
                <Text style={styles.text}>{todo ?? todo.title}</Text>
                <Text style={styles.text}>{todo ?? todo.description}</Text>
                <Switch
                    trackColor={{ false: accent.toString(), true: yellow.toString() }}
                    onValueChange={() => { }}
                ></Switch>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    text: {
        color: yellow.toString()
    }
})
export default Todo