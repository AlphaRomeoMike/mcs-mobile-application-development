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
                if (data && data.length) {
                    data = JSON.parse(data);
                    const filter = data.reduce((acc, todo) => (
                        todo.username == username && acc.push(todo), acc
                    ), []);
                    if (filter && filter.length) {
                        setTodos([{filter}]);
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
                todos && todos.length > 0 ? <SectionList
                    sections={todos}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Todo todo={item} />}
                    renderSectionHeader={({section: { category }}) => <Text>{category}</Text>}
                /> : <Text style={{ color: yellow.toString(), padding: 10 }}>No todos found</Text>
            }
        </View>
    )
}

export default Todos