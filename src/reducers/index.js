import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import dealReducer from './dealReducer';
import storeReducer from './storeReducer';
import categoryReducer from './categoryReducer';
import couponReducer from './couponReducer';
import promotionsReducer from './promotionsReducer';
import userReducer from './userReducer';
import storeDashboardReducer from './storeDashboardReducer'
import unitPurchaseReducer from './UnitPurchaseReducer';

export default combineReducers({
	errors: errorReducer,
	auth: authReducer,
	deals: dealReducer,
	stores:storeReducer,
	categories:categoryReducer,
	coupons:couponReducer,
	promotions:promotionsReducer,
	user:userReducer,
	dashboard:storeDashboardReducer,
	units:unitPurchaseReducer
});
