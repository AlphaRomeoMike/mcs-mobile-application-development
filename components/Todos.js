import { FlatList, SectionList, Text, View } from "react-native";
import { useEffect, useState } from "react";

import theme from "@constants/theme";
import Todo from '@components/Todo';
import { FloatingAction } from "react-native-floating-action";

const { background, yellow, white } = theme

function Todos({ route, navigation }) {
    const { todoList, username } = route.params;
    const [todos, setTodos] = useState(todoList);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Create a Set
        const uniqueCategories = new Set();
        // check if data is array
        if (Array.isArray(todoList)) {
            // iterate over the array
            todoList.forEach((category) => {
                // push to the hashset
                uniqueCategories.add(category.data.name);
            });
        }

        setCategories([...uniqueCategories]);
    }, [todoList]);

    // handle FAB click
    function onPressFab() {
        navigation.navigate('Add', {
            username: username
        })
    }

    return (
        <View style={{ height: '100%', backgroundColor: background.toString() }}>
            {
                todos ? <View>
                    <FlatList data={todos} renderItem={({ item }) => renderCategories({ data: item })} />
                    <View style={{marginTop: 10}}>
                        <FloatingAction color="#fca311" position="right" onPressMain={onPressFab} />
                    </View>
                </View> : <Text style={{ color: yellow.toString(), padding: 10 }}>No todos found</Text>
            }
        </View>
    )
}

const renderCategories = ({ data }) => {
    return (<View style={{ padding: 30 }}>
        <Text style={{ color: white, fontWeight: 'bold', fontSize: 18 }}>{data.name}</Text>
        <FlatList data={data.data} renderItem={renderTodos} />
    </View>)
}

const renderTodos = ({ item }) => {
    return (
        <View style={{paddingTop: 10}}>
            <Todo todo={item} />
        </View>
    )
}

export default Todos