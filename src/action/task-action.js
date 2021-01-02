import { openDatabase } from 'expo-sqlite'
import _ from 'lodash'

import * as constant from '../constant/app-constant';

const db = openDatabase('todo.db');

function taskLoadedSuccessfully(taskList) {
	console.log('---------------------------taskLoadedSuccessfully');
	return { type: constant.LOAD_TASK_LIST, taskList };
}

export function loadTaskList() {
	console.log('loadTaskList...');
	return (dispatch) => {
			db.transaction((tx) =>{
				tx.executeSql('select t.id as taskId, t.name as taskName, c.id as catId, c.name as catName, c.color from category c LEFT JOIN task t ON t.catid = c.id',
				  [],
				  (_, { rows: { _array } }) => dispatch(taskLoadedSuccessfully(_array)),
				  () => console.log('error fetching')
				);
				
			});
	};
}

export function insetTask(taskName, catId) {
	console.log('insetTask '+taskName+' '+catId);
	
	return (dispatch) => {
		db.transaction((tx) =>{
				tx.executeSql('insert or ignore into task (name, catId) values (?, ?)', [taskName, catId]);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function deleteAllTask(catId) {
	console.log('deleteAllTask '+catId);
	return (dispatch) => {
		db.transaction((tx) =>{
				tx.executeSql('delete from task where catId = ?', [catId]);
			},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
	
}