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
        const GetTodoList = async () => {
            const data = await filterTodos(username);
            console.log(data);
            return data;
        }

        const setTodoList = async () => {
            await setTodos(GetTodoList());
        }

        setTodoList();
    }, []);

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
                todoList.length > 0 ? <SectionList
                    sections={todoList}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => { return <Todo todo={item} />}}
                    renderSectionHeader={({ section: title}) => {
                        return <Text>{title}</Text>
                    }}
                /> : <Text style={{ color: yellow.toString(), padding: 10 }}>No todos found</Text>
            }
        </View>
    )
}

export default Todos