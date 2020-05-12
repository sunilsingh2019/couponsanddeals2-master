import { GET_USER, USER_LOADING, USER_DETAILS, RELATED_OFFERS } from '../actions/types';

const initialState = { 
	user: {},
	userDetails:{},
	userLoading: false,
	relatedOffers:{}
};

export default function(state = initialState, action) { 
	switch (action.type) {
		case USER_LOADING:
			return {
				...state,
				userLoading: true,
			};
		case GET_USER: 
			return {
				...state,
				user: action.payload,
				userLoading: false,
			};
		case RELATED_OFFERS: 
			return {
				...state,
				relatedOffers: action.payload,
				userLoading: false,
			};
		case USER_DETAILS: 
			return {
				...state,
				userDetails: action.payload,
				userLoading: false,
			};
		default:
			return state;
	}
}