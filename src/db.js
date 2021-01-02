import { openDatabase } from 'expo-sqlite'

export const db = openDatabase('todo.db');

export const initApp = (callback) => {
	
	console.log('initApp...')
	db.transaction((tx) => {
		tx.executeSql('create table if not exists category (id integer primary key autoincrement not null, name text, color text);');
		tx.executeSql('create table if not exists task (id integer primary key autoincrement not null, name text, catId integer, FOREIGN KEY(catId) REFERENCES category(id));');
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

/*export const fetchTask = (callback) => {
	console.log('fetchTask...');
	db.transaction((tx) =>{
		tx.executeSql('select t.id, t.name, c.id as catid, c.name as catname from task t, category c where t.catid = c.id',
		  [],
		  (_, { rows: { _array } }) => callback(_array),
		  () => console.log('error fetching')
		);
		
	});
};

export const deleteTask = (id) => {
	console.log('deleting task '+id);
	
	db.transaction((tx) =>{
		tx.executeSql('delete from task where id = ?;', [id]);
	},
	(err) => console.log(err),
	() => console.log('task id '+id+' deleted successfully'),
	);
};

export const fetchCategoryList = (callback) => {
	console.log('fetchCategoryList...');
	db.transaction((tx) =>{
		tx.executeSql('select c.id as catid, c.name as catname, c.color from category c',
		  [],
		  (_, { rows: { _array } }) => callback(_array),
		  () => console.log('error fetching')
		);
		
	});
};


export const deleteCategory = (id) => {
	console.log('deleting category '+id);
	
	db.transaction((tx) =>{
		tx.executeSql('delete from category where id = ?;', [id]);
	},
	(err) => console.log(err),
	() => console.log('category id '+id+' deleted successfully'),
	);
};

export const insetCategory = (name, color) => {
	console.log('Inserting category '+name+' with color '+color);
	
	db.transaction((tx) =>{
		tx.executeSql('insert or ignore into category (name, color) values (?, ?)', [name, color]);
	},
	(err) => console.log(err),
	() => console.log('category inserted successfully'),
	);
}*/


