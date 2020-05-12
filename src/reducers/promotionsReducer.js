import { GET_FEATURED_PROMOTIONS, PROMOTIONS_LOADING } from '../actions/types';

const initialState = { 
	featuredPromotions: [],
	promotionsLoading: false,
};

export default function(state = initialState, action) { 
	switch (action.type) {
		case PROMOTIONS_LOADING:
			return {
				...state,
				promotionsLoading: true,
			};
		case GET_FEATURED_PROMOTIONS:
			return {
				...state,
				featuredPromotions: action.payload,
				promotionsLoading: false,
			};
		default:
			return state;
	}
}