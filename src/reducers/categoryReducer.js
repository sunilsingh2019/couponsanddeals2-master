import { GET_ALL_CATEGORY, CATEGORY_LOADING, OFFERS_BY_SUBCATEGORY, GET_FOLLOWED_CATEGORIES, FOLLOW_CATEGORY, OFFERS_BY_CATEGORY} from '../actions/types';

const initialState = { 
	categories: [],
	followedCategories:[],
	categoriesLoading: false,
	followStatus:{},
	offersByCategory:{},
	offersBySubcategory:{}
};

export default function(state = initialState, action) { 
	switch (action.type) {
		case CATEGORY_LOADING:
			return {
				...state,
				categoriesLoading: true,
			};
		case GET_ALL_CATEGORY: 
			return {
				...state,
				categories: action.payload,
				categoriesLoading: false,
			};
		case GET_FOLLOWED_CATEGORIES: 
			return {
				...state,
				followedCategories: action.payload,
				categoriesLoading: false,
			};
		case FOLLOW_CATEGORY:
			return {
				...state,
				followStatus: action.payload,
				categoriesLoading: false,
			};
		case OFFERS_BY_CATEGORY: 
			return {
				...state,
				offersByCategory: action.payload,
				categoriesLoading: false,
			};
		case OFFERS_BY_SUBCATEGORY: 
			return {
				...state,
				offersBySubcategory: action.payload,
				categoriesLoading: false,
			};
		default:
			return state;
	}
}