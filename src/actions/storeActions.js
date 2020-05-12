import axios from '../api/axiosInstance';
import {
	featuredStoresAPI,
	editStoreAPI,
	storeDetailAPI,
	getFollowedStoresAPI,
	followCategoryAPI,
	followStoreAPI,
} from '../api/apiURLs';
import {
	GET_FEATURED_STORES,
	GET_ERRORS,
	EDIT_STORE,
	STORES_LOADING,
	GET_STORE_DETAIL,
	GET_FOLLOWED_STORES,
	FOLLOW_STORE,
} from './types';

export const getFeaturedStores = () => dispatch => {
	dispatch(setStoresLoading());
	axios
		.get(featuredStoresAPI)
		.then(res =>
			dispatch({
				type: GET_FEATURED_STORES,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_FEATURED_STORES,
				payload: null,
			})
		);
};

//get store detail
export const getStoreBySlug = (slug, query) => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setStoresLoading());
	axios
		.get(storeDetailAPI(slug) + query, { headers: { ...headers } })
		.then(res =>
			dispatch({
				type: GET_STORE_DETAIL,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_STORE_DETAIL,
				payload: null,
			})
		);
};

//get followed stores
export const getFollowedStores = () => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setStoresLoading());
	axios
		.get(getFollowedStoresAPI, { headers: { ...headers } })
		.then(res =>
			dispatch({
				type: GET_FOLLOWED_STORES,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_FOLLOWED_STORES,
				payload: null,
			})
		);
};

export const followStore = slug => dispatch => {
	var bodyFormData = new FormData();
	bodyFormData.set('store_slug', slug);
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setStoresLoading());
	axios({
		method: 'post',
		url: followStoreAPI,
		data: bodyFormData,
		headers: { ...headers },
	})
		.then(res =>
			dispatch({
				type: FOLLOW_STORE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: FOLLOW_STORE,
				payload: null,
			})
		);
};

//edit store
export const editStoreAction = storeData => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	dispatch(setStoresLoading());
	axios({
		method: 'post',
		url: editStoreAPI,
		data: storeData,
		headers: { ...headers },
	})
		.then(res => {
			if (res.data.status === true) {
				dispatch({
					type: EDIT_STORE,
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

//Set Stores Loading
export const setStoresLoading = () => {
	return {
		type: STORES_LOADING,
	};
};
