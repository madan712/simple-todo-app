import * as constant from '../constant/app-constant';

const initialState = {
    taskList: []
};

export default function appReducer(state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case constant.LOAD_TASK_LIST:
			console.log('LOAD_TASK_LIST');
        	newState.taskList = action.taskList;
        	return newState;
        default:
            return state;
    }
}