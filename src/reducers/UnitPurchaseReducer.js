import { UNITS_LOADING, GET_UNIT_TYPE, GET_UNIT_PACKAGE, PURCHASE_UNIT, GET_STORE_UNIT } from '../actions/types';

const initialState = { 
    unitPackages:{},
	unitsLoading:false,
	purchaseStatus:{},
	storeUnits:{},
	unitType:{}
};

export default function(state = initialState, action) { 
	switch (action.type) {
		case UNITS_LOADING:
			return {
				...state,
				unitsLoading: true,
			};
		case GET_UNIT_PACKAGE:
			return {
				...state,
				unitPackages: action.payload,
				unitsLoading: false,
			};
		case GET_UNIT_TYPE:
			return {
				...state,
				unitType: action.payload,
				unitsLoading: false,
			};
		case GET_STORE_UNIT:
			return {
				...state,
				storeUnits: action.payload,
				unitsLoading: false,
			};
		case PURCHASE_UNIT:
			return {
				...state,
				purchaseStatus: action.payload,
				unitsLoading: false,
			};
		default:
			return state;
	}
}