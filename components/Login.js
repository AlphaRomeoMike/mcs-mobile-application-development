import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";


/**
 * @description The useState variable
 * @param {Object} param0 
 * @returns 
 */
function Login({ }) {
    console.log(password);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmail(value) {
        setEmail(value);
    }

    handlePassword = (value) => {
        setPassword(value);
    }

    return (
        <View style={[styles.container, styles.inputText]}>
            {/* <Image source={require('../assets/logo.png')} /> */}
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
                    onChangeText={handlePassword}
                    value={password}
                />
            </View>

            <Pressable style={{marginTop: 30}}>
                <Text style={{}}>
                    Login
                </Text>
            </Pressable>
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