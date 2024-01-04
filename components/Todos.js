import { SectionList, Text, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

import theme from "@constants/theme";
import { todos_key } from "@helpers/keys";
import Todo from '@components/Todo';

const { background, yellow } = theme

function Todos({ route, navigation }) {
    const { todoList } = route.params;

    const [todos, setTodos] = useState({data: todoList});

    useEffect(() => {
        console.log(todoList);
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