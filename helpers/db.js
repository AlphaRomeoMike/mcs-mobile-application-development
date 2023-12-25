import { openDatabase, SQLiteDatabase, enablePromise } from "react-native-sqlite-storage";

export const getDBConnection = async () => {
    return openDatabase({
        name: 'todo.db',
        location: 'default'
    });
}

export const createTable = async (db) => {
    const query = "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY NOT NULL, display_name VARCHAR(200) NOT NULL, email VARCHAR(200) UNIQUE, password TEXT NOT NULL)";

    await db.executeSql(query);
}