import { DASHBOARD_LOADING, EDIT_COUPON, EDIT_DEAL, CHANGE_STATUS_COUPON, ADD_COUPONS, CHANGE_STATUS_DEAL,GET_ERRORS, REGISTER_STORE, GET_MY_STORES, ADD_DEAL } from '../actions/types';

const initialState = { 
    dashboardLoading:false,
	addedCoupons:{},
	newStore:{},
	myStores:{},
	dealStatus:{},
	couponStatus:{},
	addedDeal:{}, 
	editedDeal:{},
	editedCoupon:{}
};

export default function(state = initialState, action) { 
	switch (action.type) {
		case DASHBOARD_LOADING:
			return {
				...state,
				dashboardLoading: true,
			};
		case ADD_COUPONS: 
			return {
				...state,
				addedCoupons: action.payload,
				// dashboardLoading: false,
			};
		case ADD_DEAL: 
			return {
				...state,
				addedDeal: action.payload,
				dashboardLoading: false,
			};
		case GET_ERRORS:
			return{
				...state,
				dashboardLoading:false
			};
		case REGISTER_STORE: 
			return {
				...state,
				newStore: action.payload,
				dashboardLoading: false,
			};
		case CHANGE_STATUS_DEAL: 
			return {
				...state,
				dealStatus: action.payload,
				dashboardLoading: false,
			};
		case CHANGE_STATUS_COUPON: 
			return {
				...state,
				couponStatus: action.payload,
				dashboardLoading: false,
			};
		case GET_MY_STORES: 
			return {
				...state,
				myStores: action.payload,
				dashboardLoading: false,
			};
		case EDIT_DEAL:
			return {
				...state,
				editedDeal: action.payload,
				dashboardLoading: false,
			};
		case EDIT_COUPON:
			return {
				...state,
				editedCoupon: action.payload,
				dashboardLoading: false,
			};

		default:
			return state;
	}
}