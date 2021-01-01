import { openDatabase } from 'expo-sqlite'
import _ from 'lodash'

import * as constant from '../constant/app-constant';

const db = openDatabase('todo.db');

function categoryLoadedSuccessfully(categoryList) {
	console.log('---------------------------categoryLoadedSuccessfully');
	console.log(categoryList);

	return { type: constant.LOAD_CATEGORY_LIST, categoryList };
}

function addCategory(catId, catName, bgColor) {
	console.log('---------------------------addCategory');
	console.log(catId);
	let category = {"catid": catId,"catname": catName,"color": bgColor};
	console.log(category);
	return { type: constant.ADD_NEW_CATEGORY, category };
}

export function loadCategoryList() {
	return (dispatch) => {
			db.transaction((tx) =>{
				tx.executeSql('select c.id as catid, c.name as catname, c.color from category c',
				  [],
				  (_, { rows: { _array } }) => dispatch(categoryLoadedSuccessfully(_array)),
				  () => console.log('error fetching')
				);
				
			});
	};
}

export function insetCategory(catName, bgColor) {
	console.log('Category action insetCategory '+catName+' '+bgColor);
	
	return (dispatch) => {
		db.transaction((tx) =>{
			//tx.executeSql('delete from category', []);
			tx.executeSql('insert or ignore into category (name, color) values (?, ?)', [catName, bgColor]);

			tx.executeSql('select last_insert_rowid()',
				  [],
				  (_, { rows: { _array } }) => dispatch(addCategory(_array[0]['last_insert_rowid()'],catName,bgColor)),
				  () => console.log('error fetching')
				);
			
			},
			(err) => console.log(err),
			() => console.log("Success"),
		);
	};
}