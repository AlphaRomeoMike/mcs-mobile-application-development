import { SectionList, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import theme from "@constants/theme";
import { todos_key } from "@helpers/keys";
import Todo from '@components/Todo';

const { user_todos } = todos_key;

const { background, yellow } = theme

function Todos({ route, navigation }) {
    const { username, email } = route.params;

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            try {
                // retreive info from storage
                let data = await AsyncStorage.getItem(user_todos);

                // check if data exists
                if (data && (data != '' || data != undefined)) {

                    // convert data to JSON object
                    data = JSON.parse(data);

                    //filter data on the basis of username
                    const filter = data.reduce((acc, todo) => (
                        todo.username == username && acc.push(todo), acc
                    ), []);

                    // same check as data, check existence
                    if (filter && filter != []) {

                        // set the state 
                        setTodos(...todos, filter);
                    } else {
                        setTodos([]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        getTodos();
    }, [todos]);

    return (
        <View style={{ height: '100%', backgroundColor: background.toString() }}>
            {
                console.log(3, todos) && todos ? <SectionList
                    sections={todos}
                    keyExtractor={(item, index) => index}
                    renderItem={(item) => (<Todo todo={item} />)}
                    renderSectionHeader={({section: { category }}) => <Text>{category}</Text>}
                /> : <Text style={{ color: yellow.toString(), padding: 10 }}>No todos found</Text>
            }
        </View>
    )
}

export default Todos