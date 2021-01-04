import { openDatabase } from 'expo-sqlite';
import _ from 'lodash';

import { loadTaskList } from './task-action';
import * as constant from '../constant/app-constant';

const db = openDatabase('todo.db');

export function insetCategory(catName, bgColor) {	
	return (dispatch) => {
		db.transaction((tx) =>{
			tx.executeSql('insert or ignore into category (name, color) values (?, ?);', [catName, bgColor]);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function updateCategory(catId, catName, bgColor) {	
	return (dispatch) => {
		db.transaction((tx) =>{
			tx.executeSql('update category set name = ?, color = ? where id = ?;', [catName, bgColor, catId]);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function updateSequence(sequence) {
	let query = 'update category set seq = case id';
	for (let [catId, seq] of sequence) {
		query += ' when '+catId+' then '+seq;
	}
	query += ' end';
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

export function deleteCategory(catId) {
	return (dispatch) => {
		db.transaction((tx) =>{
				tx.executeSql('delete from category where id = ?', [catId]);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}