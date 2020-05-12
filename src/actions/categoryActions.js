import axios from '../api/axiosInstance';
import { getAllCategoriesAPI, getFollowedCategoriesAPI, followCategoryAPI, offersByCategoryAPI, offersBySubcategoryAPI } from '../api/apiURLs';
import { GET_ALL_CATEGORY, CATEGORY_LOADING, GET_FOLLOWED_CATEGORIES, OFFERS_BY_SUBCATEGORY, FOLLOW_CATEGORY, GET_ERRORS, OFFERS_BY_CATEGORY} from './types';

export const getAllCategories = () => dispatch => {
	dispatch(setCategoryLoading());
	axios
		.get(getAllCategoriesAPI) 
		.then(res => 
			dispatch({
				type: GET_ALL_CATEGORY,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_CATEGORY,
				payload: null,
			})
		);
};

export const getFollowedCategoreis = () => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
	};
	dispatch(setCategoryLoading());
	axios
		.get(getFollowedCategoriesAPI, { headers: { ...headers } }) 
		.then(res => 
			dispatch({
				type: GET_FOLLOWED_CATEGORIES,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_FOLLOWED_CATEGORIES,
				payload: null,
			})
		);
};

export const followCategory = (slug) => dispatch => {
	var bodyFormData = new FormData();
	bodyFormData.set('category_slug', slug);
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
	};
	dispatch(setCategoryLoading());
	axios({
		method:'post',
		url:followCategoryAPI,
		data: bodyFormData, 
		headers:{...headers}
	})
		.then(res =>
			dispatch({
				type: FOLLOW_CATEGORY,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: FOLLOW_CATEGORY,
				payload: null,
			})
		);
};

export const getOffersByCategory = (slug) => dispatch => {
	dispatch(setCategoryLoading());
	axios
		.get(offersByCategoryAPI(slug)) 
		.then(res => 
			dispatch({
				type: OFFERS_BY_CATEGORY,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: OFFERS_BY_CATEGORY,
				payload: null,
			})
		);
};

export const getOffersBySubcategory = (cat,sub) => dispatch => {
	dispatch(setCategoryLoading());
	axios
		.get(offersBySubcategoryAPI(cat,sub)) 
		.then(res => 
			dispatch({
				type: OFFERS_BY_SUBCATEGORY,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: OFFERS_BY_SUBCATEGORY,
				payload: null,
			})
		);
};

export const setCategoryLoading = () => {
	return {
		type: CATEGORY_LOADING,
	};
}; 