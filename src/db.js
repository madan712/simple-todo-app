import { openDatabase } from 'expo-sqlite';

export const db = openDatabase('todo.db');

export const initApp = (callback) => {
	db.transaction((tx) => {
		tx.executeSql('create table if not exists category (id integer primary key autoincrement not null, name text, color text, seq integer);');
		tx.executeSql('create table if not exists task (id integer primary key autoincrement not null, name text, catId integer, seq integer, isActive integer not null, FOREIGN KEY(catId) REFERENCES category(id));');
	},
	(err) => console.log(err),
	callback(),
	);
};