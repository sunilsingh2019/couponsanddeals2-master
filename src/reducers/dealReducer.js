import { DEALS_LOADING,GET_ALL_DEALS, DEAL_VIEWED, GET_TRENDING_DEALS, MIXED_DEALS, DEALS_OF_THE_DAY, GET_DEAL_DETAIL, GET_FEATURED_DEALS } from '../actions/types';

const initialState = {
	trendingDeals: [],
	deal: {},
	allDeals:[],
	featuredDeals:[],
	dealsOfTheDay:[],
	loading: false,
	viewedDeal:{}, 
	mixedDeals:{}
};

export default function(state = initialState, action) {
	switch (action.type) {
		case DEALS_LOADING:
			return {
				...state,
				loading: true,
			};
		case GET_TRENDING_DEALS:
			return {
				...state,
				trendingDeals: action.payload,
				loading: false,
			};
		case MIXED_DEALS:
			return {
				...state,
				mixedDeals: action.payload,
				loading: false,
			};
		case GET_ALL_DEALS:
			return {
				...state,
				allDeals: action.payload,
				loading: false,
			};
		case GET_FEATURED_DEALS:
			return {
				...state,
				featuredDeals: action.payload,
				loading: false,
			};
		case GET_DEAL_DETAIL:
			return {
				...state,
				deal: action.payload,
				loading: false,
			};
		case DEALS_OF_THE_DAY:
			return {
				...state,
				dealsOfTheDay: action.payload,
				loading: false,
			};
		case DEAL_VIEWED:
			return {
				...state,
				viewedDeal: action.payload,
				loading: false,
			};
		default:
			return state;
	}
}
