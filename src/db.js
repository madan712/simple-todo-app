import { openDatabase } from 'expo-sqlite'

export const db = openDatabase('todo.db');

export const initApp = (callback) => {
	
	console.log('initApp...')
	db.transaction((tx) => {
		//tx.executeSql('drop table category', []);
		//tx.executeSql('drop table task', []);
		tx.executeSql('create table if not exists category (id integer primary key autoincrement not null, name text, color text, seq integer);');
		tx.executeSql('create table if not exists task (id integer primary key autoincrement not null, name text, catId integer, seq integer, isActive integer not null, FOREIGN KEY(catId) REFERENCES category(id));');
		/*tx.executeSql('insert or ignore into category (name, color) values (?, ?)', ['Office', '#808080']);
		tx.executeSql('insert or ignore into category (name, color) values (?, ?)', ['Home', '#add8e6']);
		tx.executeSql('insert or ignore into task (name, catId) values (?, ?)', ['Presentation', 1]);
		tx.executeSql('insert or ignore into task (name, catId) values (?, ?)', ['Report', 1]);
		tx.executeSql('insert or ignore into task (name, catId) values (?, ?)', ['Shopping', 2]);
		tx.executeSql('insert or ignore into task (name, catId) values (?, ?)', ['Cleaning', 2]);*/
	},
	(err) => console.log(err),
	callback(),
	);
};