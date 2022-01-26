import { openDatabase } from 'expo-sqlite';
import _ from 'lodash';

import * as constant from '../constant/app-constant';

const db = openDatabase('todo.db');

function taskLoadingStarted() {
	return { type: constant.LOAD_TASK_LIST_START };
}

function taskLoadingCompleted() {
	return { type: constant.LOAD_TASK_LIST_END };
}

function taskLoadedSuccessfully(taskList) {
	return { type: constant.LOAD_TASK_LIST, taskList };
}

export function updateTaskList(taskList) {
	return (dispatch) => {
		dispatch(taskLoadedSuccessfully(taskList));
	};
}

export function loadTaskListInitial() {
	return (dispatch) => {
		dispatch(taskLoadingStarted());
		db.transaction((tx) => {
			tx.executeSql('select t.id as taskId, t.name as taskName, t.seq as tSeq, t.isActive, c.id as catId, c.name as catName, c.color, c.seq as cSeq from category c LEFT JOIN task t ON t.catid = c.id',
				[],
				(_, { rows: { _array } }) => { dispatch(taskLoadedSuccessfully(_array)), dispatch(taskLoadingCompleted()) },
				() => console.log('error fetching')
			);

		});

	};
}

export function loadTaskList() {
	return (dispatch) => {
		db.transaction((tx) => {
			tx.executeSql('select t.id as taskId, t.name as taskName, t.seq as tSeq, t.isActive, c.id as catId, c.name as catName, c.color, c.seq as cSeq from category c LEFT JOIN task t ON t.catid = c.id',
				[],
				(_, { rows: { _array } }) => { dispatch(taskLoadedSuccessfully(_array)) },
				() => console.log('error fetching')
			);

		});

	};
}

export function insetTask(taskName, catId) {
	return (dispatch) => {
		db.transaction((tx) => {
			tx.executeSql('insert or ignore into task (name, catId, isActive) values (?, ?, ?)', [taskName, catId, 1]);
		},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function updateTask(taskId, taskName) {
	return (dispatch) => {
		db.transaction((tx) => {
			tx.executeSql('update task set name = ? where id = ?', [taskName, taskId]);
		},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function deleteAllTask(catId) {
	return (dispatch) => {
		db.transaction((tx) => {
			tx.executeSql('delete from task where catId = ?', [catId]);
		},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function deleteTask(taskId) {
	return (dispatch) => {
		db.transaction((tx) => {
			tx.executeSql('delete from task where id = ?', [taskId]);
		},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function updateSequence(sequence) {
	let query = 'update task set seq = case id';
	for (let [taskId, seq] of sequence) {
		query += ' when ' + taskId + ' then ' + seq;
	}
	query += ' end';
	return (dispatch) => {

		db.transaction((tx) => {
			tx.executeSql(query, []);
		},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}

export function toggleActive(taskId) {
	return (dispatch) => {
		db.transaction((tx) => {
			tx.executeSql('update task set isActive = case isActive when 1 then 0 else 1 end where id = ?', [taskId]);
		},
			(err) => console.log(err),
			() => dispatch(loadTaskList()),
		);
	};
}