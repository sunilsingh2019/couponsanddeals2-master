import { GET_FEATURED_STORES, STORES_LOADING, EDIT_STORE, GET_STORE_DETAIL, GET_FOLLOWED_STORES, FOLLOW_STORE } from '../actions/types';

const initialState = { 
	featuredStores: [],
	store:{},
	storesLoading: false,
	followedStores:[],
	followStatus:{},
	editedStore:{}
};

export default function(state = initialState, action) { 
	switch (action.type) {
		case STORES_LOADING:
			return {
				...state,
				storesLoading: true,
			};
		case GET_FEATURED_STORES:
			return {
				...state,
				featuredStores: action.payload,
				storesLoading: false,
			};
		case EDIT_STORE:
			return {
				...state,
				editedStore: action.payload,
				storesLoading: false,
			};
		case GET_STORE_DETAIL:
			return {
				...state,
				store: action.payload,
				storesLoading: false,
			};
		case GET_FOLLOWED_STORES:
			return {
				...state,
				followedStores: action.payload,
				storesLoading: false,
			};
		case FOLLOW_STORE:
			return {
				...state,
				followStatus: action.payload,
				storesLoading: false,
			};
		default:
			return state;
	}
}