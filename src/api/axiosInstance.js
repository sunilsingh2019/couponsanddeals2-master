import axios from 'axios';

const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

const axiosInstance = axios.create({
	// baseURL: 'http://159.65.158.124/deals-backend/public/api/',
	// baseURL: 'http://localhost:8000/api/',
	baseURL:'http://128.199.214.172/deals-backend/api/'
});

export const getHeaders = access_token => ({
	Accept: 'application/json',
	Authorization: `Bearer ${access_token}`,
});

export default axiosInstance;
