import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";


/**
 * @description The useState variable
 * @param {Object} param0 
 * @returns 
 */
function Login({ }) {
    const [email, setEmail] = useState('');

    function handleEmail(value) {
        setEmail(value);
    }

    return (
        <View style={[styles.container, styles.inputText]}>
            <View style={{ marginTop: 30 }}>
                <Text style={{ color: 'black' }}>Email</Text>
                <TextInput
                    placeholder="Please enter email"
                    keyboardType="email-address"
                    onChangeText={(value) => handleEmail}
                    value={email}
                />
            </View>

            <View style={{ marginTop: 30 }}>
                <Text>Passowrd</Text>
                <TextInput
                    placeholder="Please enter password"
                    keyboardType="default"
                    onChangeText={(value) => handlePassword}
                    value={password}
                />
            </View>

            <Pressable>Button</Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 30,
        padding: 30,
        backgroundColor: 'white',
        height: 300
    },
    inputText: {

    }
});

export default Login;