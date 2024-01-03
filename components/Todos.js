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
                let data = await AsyncStorage.getItem(user_todos);

                if (data && (data != '' || data != undefined)) {
                    data = JSON.parse(data);
                    console.log(1, typeof data);
                    let filter = data.reduce((acc, todo) => (
                        todo.username == username && acc.push(todo), acc
                    ), []);
                    console.log(2, filter);
                    if (filter && filter != []) {
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
    }, []);

    return (
        <View style={{ height: '100%', backgroundColor: background.toString() }}>
            {
                console.log(3, todos) && todos ? <SectionList
                    sections={todos}
                    keyExtractor={(item, index) => item + index}
                    renderItem={(item) => (<Todo todo={item} />)}
                    renderSectionHeader={({section: { category }}) => <Text>{category}</Text>}
                /> : <Text style={{ color: yellow.toString(), padding: 10 }}>No todos found</Text>
            }
        </View>
    )
}

export default Todos