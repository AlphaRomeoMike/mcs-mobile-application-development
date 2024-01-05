import { FlatList, SectionList, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import theme from "@constants/theme";
import Todo from '@components/Todo';

const { background, yellow, white } = theme

function Todos({ route, navigation }) {
    const { todoList } = route.params;
    const [todos, setTodos] = useState(todoList);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const uniqueCategories = new Set();
        if (Array.isArray(todoList)) {
            todoList.forEach((category) => {
                uniqueCategories.add(category.data.name);
            });
        }

        setCategories([...uniqueCategories]);
    }, [todoList])

    return (
        <View style={{ height: '100%', backgroundColor: background.toString() }}>
            {
                todos ? <FlatList data={todos} renderItem={({ item }) => renderCategories({ data: item })} /> : <Text style={{ color: yellow.toString(), padding: 10 }}>No todos found</Text>
            }
        </View>
    )
}

const renderCategories = ({ data }) => {
    return (<View style={{ padding: 30 }}>
        <Text style={{ color: white, fontWeight: 'bold', fontSize: 18 }}>{data.name}</Text>
        {
            // data.data.map((todo) => (
            //     <View key={todo.title}>
            //         {renderTodos({data: todo})}
            //     </View>
            // ))
        }
    </View>)
}

const renderTodos = ({ data }) => {
    return (
        <View>
            <Todo todo={data} />
        </View>
    )
}

export default Todos