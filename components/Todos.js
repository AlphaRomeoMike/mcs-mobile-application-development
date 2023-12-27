import { Text, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import theme from "@constants/theme";
import { todos_key } from "@helpers/keys";
import Todo from '@components/Todo'

const { user_todos } = todos_key;

const { background } = theme

function Todos({ route, navigation }) {
    const { username, email } = route.params;

    const [todoList, setTodos] = useState([]);

    console.log(username, email);

    useEffect(() => {
        const todoList = async () => {
            const data = await filterTodos(username);
            setTodos(data);
        }
        todoList();
    }, [todoList]);

    const getData = async () => {
        const todos = await AsyncStorage.getItem(user_todos ?? 'user_todos');
        return todos != null ? JSON.parse(todos) : null;
    }

    const filterTodos = async (username) => {
        const todos = await getData();
        todos = todos.filter((todo) => todo.username == username);
        return todos;
    }

    return (
        <View style={{ height: '100%', backgroundColor: background.toString(), marginTop: 30 }}>
            { todoList && todoList.length > 0}
        </View>
    )
}

export default Todos