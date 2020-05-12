import axios from '../api/axiosInstance';
import { GET_ALL_DEALS,DEALS_LOADING, DEAL_VIEWED, GET_TRENDING_DEALS, GET_DEAL_DETAIL,DEALS_OF_THE_DAY, MIXED_DEALS, GET_FEATURED_DEALS } from './types';
import { trendingDealsAPI, dealViewedAPI, dealsOfTheDayAPI, dealDetailAPI, featuredDealsAPI, mixedDealsAPI, allDealsAPI } from '../api/apiURLs';

export const getTrendingDeals = () => dispatch => {
	dispatch(setDealsLoading());
	axios
		.get(trendingDealsAPI)
		.then(res =>
			dispatch({ 
				type: GET_TRENDING_DEALS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_TRENDING_DEALS,
				payload: null,
			})
		);
};

export const getMixedDeals = () => dispatch => {
	dispatch(setDealsLoading());
	axios
		.get(mixedDealsAPI)
		.then(res =>
			dispatch({ 
				type: MIXED_DEALS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: MIXED_DEALS,
				payload: null,
			})
		);
};

//for (deals-of-the-day)
export const getDealsOfTheDay = () => dispatch => {
	dispatch(setDealsLoading());
	axios
		.get(dealsOfTheDayAPI)
		.then(res =>
			dispatch({
				type: DEALS_OF_THE_DAY,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: DEALS_OF_THE_DAY,
				payload: null,
			})
		);
};

//for all deals
export const getAllDeals = () => dispatch => {
	dispatch(setDealsLoading());
	axios
		.get(allDealsAPI)
		.then(res =>
			dispatch({ 
				type: GET_ALL_DEALS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ALL_DEALS,
				payload: null,
			})
		);
};

//for featured deals
export const getFeaturedDeals = () => dispatch => {
	dispatch(setDealsLoading());
	axios
		.get(featuredDealsAPI)
		.then(res =>
			dispatch({ 
				type: GET_FEATURED_DEALS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_FEATURED_DEALS,
				payload: null,
			})
		);
};

//Get Deal By Slug
export const getDealBySlug = slug => dispatch => {
	dispatch(setDealsLoading());
	axios
		.get(dealDetailAPI(slug))
		.then(res =>
			dispatch({
				type: GET_DEAL_DETAIL,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_DEAL_DETAIL,
				payload: null,
			})
		);
};

//deal view count increases
export const viewDeal = slug => dispatch => {
	dispatch(setDealsLoading());
	axios
		.get(dealViewedAPI(slug))
		.then(res =>
			dispatch({
				type: DEAL_VIEWED,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: DEAL_VIEWED,
				payload: null,
			})
		);
};

//Set Deals Loading
export const setDealsLoading = () => {
	return {
		type: DEALS_LOADING,
	};
};
