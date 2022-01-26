import * as constant from '../constant/app-constant';

const initialState = {
	taskList: [],
	isLoaded: false
};

export default function appReducer(state = initialState, action) {
	const newState = Object.assign({}, state);
	switch (action.type) {
		case constant.LOAD_TASK_LIST_START:
			newState.isLoaded = false;
			return newState;
		case constant.LOAD_TASK_LIST_END:
			newState.isLoaded = true;
			return newState;
		case constant.LOAD_TASK_LIST:
			newState.taskList = action.taskList;
			// console.log(newState);
			return newState;
		default:
			return state;
	}
}