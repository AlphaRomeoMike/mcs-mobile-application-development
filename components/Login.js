import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";


/**
 * @description The useState variable
 * @param {Object} param0 
 * @returns 
 */
function Login({ }) {
    console.log(email);
    const [email, setEmail] = useState('');

    function handleEmail(value) {
        setEmail(value);
    }

    return (
        <View style={[styles.container, styles.inputText]}>
            <Text style={{color: 'black'}}>Email</Text>
            <TextInput
                placeholder="Please enter email"
                keyboardType="email-address"
                onChangeText={(value) => handleEmail}
                value={email}
            ></TextInput>
            <Text>Passowrd</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginTop: 30,
        padding: 10,
        backgroundColor: 'red',
        height: 300
    },
    inputText: {

    }
});

export default Login;