import axios from '../api/axiosInstance';
import { GET_UNIT_PACKAGE, GET_UNIT_TYPE, UNITS_LOADING, GET_STORE_UNIT, PURCHASE_UNIT, GET_ERRORS} from './types';

import { purchaseUnitAPI, getUnitTypeAPI, getUnitPackageAPI, getStoreUnitAPI } from '../api/apiURLs';

export const getUnitPackage = () => dispatch => {
	dispatch(setUnitsLoading());
	axios
		.get(getUnitPackageAPI) 
		.then(res => 
			dispatch({
				type: GET_UNIT_PACKAGE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_UNIT_PACKAGE,
				payload: null,
			})
        ); 
	}
	
//for purchasing units
export const purchaseUnits = unitData => dispatch => {
    const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
    };
	dispatch(setUnitsLoading());
	axios({
		method:'post',
		url:purchaseUnitAPI,
		data: unitData,  
		headers:{...headers}
	})
		.then(res =>{
			if (res.data.status === true) {
				dispatch({
					type: PURCHASE_UNIT,
					payload: res.data,
				})
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

//get store units
export const getStoreUnit = (id) => dispatch => {
	const access_token = window.localStorage.getItem('access_token');
	const headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`, 
	}
	dispatch(setUnitsLoading());
	axios
		.get(getStoreUnitAPI(id), { headers: { ...headers } }) 
		.then(res => 
			dispatch({
				type: GET_STORE_UNIT,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_STORE_UNIT,
				payload: null,
			})
        ); 
	}

//for getting unit type
export const getUnitType = (type, service) => dispatch => {
	dispatch(setUnitsLoading());
	axios
		.get(getUnitTypeAPI(type,service)) 
		.then(res => 
			dispatch({
				type: GET_UNIT_TYPE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_UNIT_TYPE,
				payload: null,
			})
        ); 
	}

export const setUnitsLoading = () => {
    return {
        type: UNITS_LOADING,
    };
}; 