import axios from '../api/axiosInstance';
import {
	allCouponsAPI,
	offersHomeAPI,
	couponCategoryAPI,
	mixedCouponsHomeAPI,
	couponViewedAPI,
	claimCouponAPI,
	trendingCouponsAPI,
	featuredCouponsAPI,
	couponDetailAPI,
	viewClaimedCouponAPI,
} from '../api/apiURLs';
import {
	GET_ALL_COUPONS,
	GET_OFFERS_HOME,
	GET_COUPON_CATEGORY,
	COUPON_VIEWED,
	GET_MIXED_COUPONS_HOME,
	CLAIM_COUPON,
	VIEW_CLAIM_COUPON,
	COUPONS_LOADING,
	GET_TRENDING_COUPONS,
	GET_FEATURED_COUPONS,
	GET_COUPON_DETAIL,
	GET_ERRORS,
} from './types';

export const getAllCoupons = () => dispatch => {
	dispatch(setCouponsLoading());
	axios
		.get(allCouponsAPI)
		.then(res =>
			dispatch({
				type: GET_ALL_COUPONS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_COUPONS,
				payload: null,
			})
		);
};

//for trending coupons
export const getTrendingCoupons = () => dispatch => {
	dispatch(setCouponsLoading());
	axios
		.get(trendingCouponsAPI)
		.then(res =>
			dispatch({
				type: GET_TRENDING_COUPONS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_TRENDING_COUPONS,
				payload: null,
			})
		);
};

//for featured coupons
export const getFeaturedCoupons = () => dispatch => {
	dispatch(setCouponsLoading());
	axios
		.get(featuredCouponsAPI)
		.then(res =>
			dispatch({
				type: GET_FEATURED_COUPONS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_FEATURED_COUPONS,
				payload: null,
			})
		);
};

//for getting individual coupon detail
export const getCouponBySlug = slug => dispatch => {
	dispatch(setCouponsLoading());
	axios
		.get(couponDetailAPI(slug))
		.then(res =>
			dispatch({
				type: GET_COUPON_DETAIL,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_COUPON_DETAIL,
				payload: null,
			})
		);
};

//for claiming coupon
// export const claimCoupon = slug => dispatch => {
// 	const access_token = window.localStorage.getItem('access_token');
// 	const headers = {
// 		Accept: 'application/json',
// 		'Content-Type': 'application/json',
// 		Authorization: `Bearer ${access_token}`,
// 	};
// 	// dispatch(setCouponsLoading());
// 	axios
// 		.post(claimCouponAPI(slug), {}, { headers: { ...headers } })
// 		.then(res => {
// 			if (res.data.status === true) {
// 				dispatch(viewClaimedCoupon(res.data.data.qr_token));
// 			} else {
// 				dispatch({
// 					type: GET_ERRORS,
// 					payload: res.data.error,
// 				});
// 			}
// 		})
// 		.catch(err =>
// 			dispatch({
// 				type: GET_ERRORS,
// 				payload: 'something went wrong',
// 			})
// 		);
// };

//for viewing claimed coupon
// export const viewClaimedCoupon = randomQrToken => dispatch => {
// 	axios
// 		.get(viewClaimedCouponAPI(randomQrToken))
// 		.then(res => {
// 			if (res.data.status === true) {
// 				dispatch({
// 					type: CLAIM_COUPON,
// 					payload: res.data,
// 				});
// 			} else {
// 				dispatch({
// 					type: GET_ERRORS,
// 					payload: res.data.error,
// 				});
// 			}
// 		})
// 		.catch(err =>
// 			dispatch({
// 				type: GET_ERRORS,
// 				payload: 'something went wrong',
// 			})
// 		);
// };

//coupon view count increases
export const couponIsViewed = slug => dispatch => {
	dispatch(setCouponsLoading());
	axios
		.get(couponViewedAPI(slug))
		.then(res =>
			dispatch({
				type: COUPON_VIEWED,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: COUPON_VIEWED,
				payload: null,
			})
		);
};

//get coupon by category slug
export const getCouponCategory = slug => dispatch => {
	dispatch(setCouponsLoading());
	axios
		.get(couponCategoryAPI(slug))
		.then(res =>
			dispatch({
				type: GET_COUPON_CATEGORY,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_COUPON_CATEGORY,
				payload: null,
			})
		);
};

//for offers home
export const getOffersHome = () => dispatch => {
	dispatch(setCouponsLoading());
	axios
		.get(offersHomeAPI)
		.then(res =>
			dispatch({
				type: GET_OFFERS_HOME,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_OFFERS_HOME,
				payload: null,
			})
		);
};

//for mixed coupons
export const getMixedCouponsHome = () => dispatch => {
	dispatch(setCouponsLoading());
	axios
		.get(mixedCouponsHomeAPI)
		.then(res =>
			dispatch({
				type: GET_MIXED_COUPONS_HOME,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_MIXED_COUPONS_HOME,
				payload: null,
			})
		);
};

export const setCouponsLoading = () => {
	return {
		type: COUPONS_LOADING,
	};
};
