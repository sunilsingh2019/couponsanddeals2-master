import axios from '../api/axiosInstance';
import { getFeaturedPromotionsAPI } from '../api/apiURLs';
import { GET_FEATURED_PROMOTIONS, PROMOTIONS_LOADING } from './types';

export const getFeaturedPromotions = () => dispatch => {
	dispatch(setPromotionsLoading());
	axios
		.get(getFeaturedPromotionsAPI) 
		.then(res => 
			dispatch({
				type: GET_FEATURED_PROMOTIONS,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_FEATURED_PROMOTIONS,
				payload: null,
			})
		);
};

export const setPromotionsLoading = () => {
	return {
		type: PROMOTIONS_LOADING,
	};
}; 