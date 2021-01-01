import {combineReducers} from 'redux';

import categoryReducer from './category-reducer';
import taskReducer from './task-reducer';


const rootReducer = combineReducers({
	categoryReducer,
	taskReducer
});

export default rootReducer;