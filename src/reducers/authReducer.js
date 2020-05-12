import { SET_CURRENT_USER, SET_AUTH_REDIRECT_PATH } from '../actions/types';
import isEmpty from '../validation/isEmpty';

const initialState = {
	isAuthenticated: false,
	user: {},
	authRedirectPath: '/'
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case SET_AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path
			}
		default: 
			return state;
	} 
}
