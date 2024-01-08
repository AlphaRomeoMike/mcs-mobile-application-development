import { StyleSheet, Switch, Text, View } from "react-native"

import theme from "../constants/theme";
import { useState } from "react";

const { accent, yellow } = theme

function Todo({ todo }) {
    const [item, setItem] = useState(todo);
    const { completed, description, title } = item
    return (
        <View>
            <View style={{}}>
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.text}>{description}</Text>
                <Switch
                    trackColor={{ false: accent.toString(), true: yellow.toString() }}
                    onValueChange={() => setItem({...item, completed: !completed})}
                    value={completed}
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