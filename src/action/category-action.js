import { openDatabase } from 'expo-sqlite'

import { loadTaskList } from './task-action';
import * as constant from '../constant/app-constant';

const db = openDatabase('todo.db');

export function insetCategory(catName, bgColor) {
	console.log('Category action insetCategory '+catName+' '+bgColor);
	
	return (dispatch) => {
		db.transaction((tx) =>{
			//tx.executeSql('delete from category', []);
			//tx.executeSql('delete from task', []);
			tx.executeSql('insert or ignore into category (name, color) values (?, ?)', [catName, bgColor]);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}