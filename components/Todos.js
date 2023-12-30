import { SectionList, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import theme from "@constants/theme";
import { todos_key } from "@helpers/keys";
import Todo from '@components/Todo';
import data from "../helpers/data";

const { user_todos } = todos_key;

const { background, yellow } = theme

function Todos({ route, navigation }) {
    const { username, email } = route.params;

    const [todoList, setTodos] = useState([]);

    useEffect(() => {
        const setTodo = async () => {
            await AsyncStorage.setItem(user_todos, JSON.stringify(data))
        }

        const GetTodoList = async () => {
            const data = await filterTodos(username);
            setTodos(data);
        }
        setTodo()
        GetTodoList();
    }, [todoList]);

    const getData = async () => {
        const todos = await AsyncStorage.getItem(user_todos ?? 'user_todos');
        return (todos != null) ? JSON.parse(todos) : null;
    }

    const filterTodos = async (username) => {
        const todos = await getData();
        if (!todos || !todos.length) {
            return null;
        }
        const groupedTodos = todos.reduce((acc, todo) => {
            const category = todo.category || 'Uncategorized';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(todo);
            return acc;
        }, {});

        const sections = Object.entries(groupedTodos).map(([category, todos]) => ({
            title: category,
            data: todos,
        }));

        return sections;
    }

    return (
        <View style={{ height: '100%', backgroundColor: background.toString() }}>
            {
                todoList ? <SectionList
                    sections={todoList}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => <Todo todo={item} />}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 10 }}>{{ title }}</Text>
                    )}
                /> : <Text style={{ color: yellow.toString(), padding: 10 }}>No todos found</Text>
            }
        </View>
    )
}

export default Todos