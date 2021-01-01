import * as constant from '../constant/app-constant';

const initialState = {
    categoryList: []
};

export default function categoryReducer(state = initialState, action) {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case constant.LOAD_CATEGORY_LIST:
			console.log('LOAD_CATEGORY_LIST');
        	newState.categoryList = action.categoryList;
        	return newState;
		case constant.ADD_NEW_CATEGORY:
			console.log('ADD_NEW_CATEGORY');
        	newState.categoryList = [...state.categoryList, action.category];
        	return newState;			
        default:
            return state;
    }
}