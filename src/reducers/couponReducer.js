import {
	GET_ALL_COUPONS,
	GET_OFFERS_HOME,
	GET_COUPON_CATEGORY,
	COUPON_VIEWED,
	COUPONS_LOADING,
	GET_TRENDING_COUPONS,
	GET_FEATURED_COUPONS,
	GET_COUPON_DETAIL,
	// CLAIM_COUPON,
	GET_MIXED_COUPONS_HOME,
} from '../actions/types';
import isEmpty from '../validation/isEmpty';

const initialState = {
	allCoupons: [],
	trendingCoupons: [],
	featuredCoupons: [],
	couponsLoading: false,
	coupon: {},
	couponViewed: {},
	couponCategory: {},
	offersHome: {},
	mixedCouponsHome: {},
};

export default function(state = initialState, action) {
	switch (action.type) {
		case COUPONS_LOADING:
			return {
				...state,
				couponsLoading: true,
			};
		case GET_ALL_COUPONS:
			return {
				...state,
				allCoupons: action.payload,
				couponsLoading: false,
			};
		case COUPON_VIEWED:
			return {
				...state,
				couponViewed: action.payload,
				couponsLoading: false,
			};
		case GET_TRENDING_COUPONS:
			return {
				...state,
				trendingCoupons: action.payload,
				couponsLoading: false,
			};
		case GET_FEATURED_COUPONS:
			return {
				...state,
				featuredCoupons: action.payload,
				couponsLoading: false,
			};
		case GET_COUPON_DETAIL:
			return {
				...state,
				coupon: action.payload,
				couponsLoading: false,
			};
		// case CLAIM_COUPON:
		// 	return {
		// 		...state,
		// 		claimedCoupon: action.payload,
		// 	};

		case GET_COUPON_CATEGORY:
			return {
				...state,
				couponCategory: action.payload,
				couponsLoading: false,
			};
		case GET_OFFERS_HOME:
			return {
				...state,
				offersHome: action.payload,
				couponsLoading: false,
			};
		case GET_MIXED_COUPONS_HOME:
			return {
				...state,
				mixedCouponsHome: action.payload,
				couponsLoading: false,
			};
		default:
			return state;
	}
}
