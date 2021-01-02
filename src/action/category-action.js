import { openDatabase } from 'expo-sqlite'
import _ from 'lodash';

import { loadTaskList } from './task-action';
import * as constant from '../constant/app-constant';

const db = openDatabase('todo.db');

export function insetCategory(catName, bgColor) {
	console.log('Category action insetCategory '+catName+' '+bgColor);
	
	return (dispatch) => {
		db.transaction((tx) =>{
			//tx.executeSql('delete from category', []);
			//tx.executeSql('delete from task', []);
			tx.executeSql('insert or ignore into category (name, color) values (?, ?);', [catName, bgColor]);
			tx.executeSql('UPDATE category SET seq = id WHERE _ROWID_ = last_insert_rowid();', []);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function updateSequence(sequence) {
	let query = 'update category set seq = case id';
	_.forEach(sequence, seq => {
		query += ' when '+seq.catId+' then '+seq.index;
	});
	query += ' end';
	console.log(query);
	
	return (dispatch) => {
		db.transaction((tx) =>{
			tx.executeSql(query, []);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function deleteAllCategory() {
	return (dispatch) => {
		db.transaction((tx) =>{
				tx.executeSql('delete from category', []);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}