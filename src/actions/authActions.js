import axios from '../api/axiosInstance';
import { GET_ERRORS, SET_CURRENT_USER, SET_AUTH_REDIRECT_PATH } from './types';

import { loginAPI, logoutAPI, registerAPI, facebookLoginAPI, googleLoginAPI } from '../api/apiURLs';

export const registerUser = (userData, history, account) => dispatch => {
	axios
		.post(registerAPI, userData)
		.then(res => {
			if (res.data.status === true) {
				history.push({
					pathname:'/verify-mail',
					state:{
						account:account
					}
				});
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data.error,
				});
			}
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data.error,
			});
		});
};

export const loginUser = userData => dispatch => {
	axios
		.post(loginAPI, userData)
		.then(res => {
			if (res.data.status === true) {
				const { access_token, expires_at, user } = res.data;
				window.localStorage.setItem('access_token', access_token);
				window.localStorage.setItem('expires_at', expires_at);
				window.localStorage.setItem('user', JSON.stringify(user));
				dispatch(setCurrentUser(user));
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: res.data.message,
				});
			}
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const loginViaFacebook = userData => dispatch => {
	axios
		.post(facebookLoginAPI, userData)
		.then(res => {
			if (res.data.status === true) {
				const { access_token, expires_at, user } = res.data;
				window.localStorage.setItem('access_token', access_token);
				window.localStorage.setItem('expires_at', expires_at);
				window.localStorage.setItem('user', JSON.stringify(user));
				dispatch(setCurrentUser(user));
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: 'Something went wrong',
				});
			}
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const loginViaGoogle = userData => dispatch => {
	axios
		.post(googleLoginAPI, userData)
		.then(res => {
			if (res.data.status === true) {
				const { access_token, expires_at, user } = res.data;
				window.localStorage.setItem('access_token', access_token);
				window.localStorage.setItem('expires_at', expires_at);
				window.localStorage.setItem('user', JSON.stringify(user));
				dispatch(setCurrentUser(user));
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: 'Something went wrong',
				});
			}
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const setCurrentUser = user => {
	return {
		type: SET_CURRENT_USER,
		payload: user,
	};
};

export const logoutUser = () => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};
	axios
		.post(logoutAPI, {}, { headers: { ...headers } })
		.then(() => {
			window.localStorage.removeItem('access_token');
			window.localStorage.removeItem('expires_at');
			window.localStorage.removeItem('user');
			dispatch(setCurrentUser({}));
			dispatch(setAuthRedirectPath('/'));
			this.props.history.push('/login');
		})
		.catch(error => {
			dispatch({
				type: GET_ERRORS,
				payload: error.response.data,
			});
		});
};

export const setAuthRedirectPath = path => {
	return {
		type: SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};
