import axios from '../api/axiosInstance';
import { GET_USER, USER_LOADING, USER_DETAILS, RELATED_OFFERS } from './types';
import { getUserAPI, getUserDetail, relatedOffersAPI } from '../api/apiURLs';

export const getUser = () => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
	};
    dispatch(setUserLoading());
	axios
		.get(getUserAPI, { headers: { ...headers } }) 
		.then(res => 
			dispatch({	
				type: GET_USER,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_USER,
				payload: null,
			})
		);
};

//user details
export const getUserDetails = () => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
	};
    dispatch(setUserLoading());
	axios
		.get(getUserDetail, { headers: { ...headers } })
		.then(res => 
			dispatch({
				type: USER_DETAILS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: USER_DETAILS,
				payload: null,
			})
		);
};

//related offers
export const getRelatedOffers = () => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
	};
    dispatch(setUserLoading());
	axios
		.get(relatedOffersAPI, { headers: { ...headers } }) 
		.then(res => 
			dispatch({
				type: RELATED_OFFERS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: RELATED_OFFERS,
				payload: null,
			})
		);
};

export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
}; 