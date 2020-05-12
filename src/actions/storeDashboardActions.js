import axios from '../api/axiosInstance';
import {
	DASHBOARD_LOADING,
	EDIT_COUPON,
	EDIT_DEAL,
	CHANGE_STATUS_COUPON,
	CHANGE_STATUS_DEAL,
	ADD_COUPONS,
	GET_ERRORS,
	REGISTER_STORE,
	GET_MY_STORES,
	ADD_DEAL,
} from './types';

import {
	addCouponAPI,
	editCouponAPI,
	editDealAPI,
	registerStoreAPI,
	changeStatusDealAPI,
	myStoreAPI,
	addDealAPI,
	changeStatusCouponAPI,
} from '../api/apiURLs';

//for adding coupon
export const addCoupon = couponData => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setDashboardLoading());
	axios({
		method: 'post',
		url: addCouponAPI,
		data: couponData,
		headers: { ...headers },
	})
		.then(res => {
			if (res.data.status === true) {
				dispatch({
					type: ADD_COUPONS,
					payload: res.data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data.error,
				});
			}
		})
		.catch(err => {
			const errors = Object.values(err.response.data.error.errors)
			dispatch({
				type: GET_ERRORS,
				payload: errors,
			});
		});
};

//add deal
export const addDeal = dealData => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setDashboardLoading());
	axios({
		method: 'post',
		url: addDealAPI,
		data: dealData,
		headers: { ...headers },
	})
		.then(res => {
			if (res.data.status === true) {
				dispatch({
					type: ADD_DEAL,
					payload: res.data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data.error,
				});
			}
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

//register store
export const registerStore = storeData => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setDashboardLoading());
	axios({
		method: 'post',
		url: registerStoreAPI,
		data: storeData,
		headers: { ...headers },
	})
		.then(res => {
			console.log(res);
			if (res.data.status === true) {
				dispatch({
					type: REGISTER_STORE,
					payload: res.data,
				});
			} else {
				console.log(res,"error")
				dispatch({
					type: GET_ERRORS,
					payload: res.data.error,
				});
			}
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.error,
			})
		);
};

//for viewing my stores
export const getMyStores = () => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setDashboardLoading());
	axios
		.get(myStoreAPI, { headers: { ...headers } })
		.then(res =>
			dispatch({
				type: GET_MY_STORES,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_MY_STORES,
				payload: null,
			})
		);
};

//for toggling deal status
export const changeStatusDeal = id => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setDashboardLoading());
	axios
		.post(changeStatusDealAPI(id), {}, { headers: { ...headers } })
		.then(res =>
			dispatch({
				type: CHANGE_STATUS_DEAL,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: CHANGE_STATUS_DEAL,
				payload: null,
			})
		);
};

//for changing COUPON ststus
export const changeStatusCoupon = id => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setDashboardLoading());
	axios
		.post(changeStatusCouponAPI(id), {}, { headers: { ...headers } })
		.then(res =>
			dispatch({
				type: CHANGE_STATUS_COUPON,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: CHANGE_STATUS_COUPON,
				payload: null,
			})
		);
};

//for editing dela
export const editDeal = dealData => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setDashboardLoading());
	axios({
		method: 'post',
		url: editDealAPI,
		data: dealData,
		headers: { ...headers },
	})
		.then(res => {
			if (res.data.status === true) {
				dispatch({
					type: EDIT_DEAL,
					payload: res.data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data.error,
				});
			}
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: 'something went wrong!!',
			});
		});
};

//for editing coupon
export const editCoupon = couponData => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setDashboardLoading());
	axios({
		method: 'post',
		url: editCouponAPI,
		data: couponData,
		headers: { ...headers },
	})
		.then(res => {
			if (res.data.status === true) {
				dispatch({
					type: EDIT_COUPON,
					payload: res.data,
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data.error,
				});
			}
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: GET_ERRORS,
				payload: 'something went wrong!!',
			});
		});
};

export const setDashboardLoading = () => {
	return {
		type: DASHBOARD_LOADING,
	};
};
