import axios from 'axios';
import store from '@/store';

const apiClient = axios.create({
	baseURL: `${process.env.VUE_APP_URL}/api`,
	headers: {
		'Content-Type': 'application/json',
	},
	validateStatus: function() {
		return true;
	},
});

apiClient.interceptors.request.use((config) => {
	store.dispatch('startLoading');
	return config;
});

apiClient.interceptors.response.use(
	(response) => {
		store.dispatch('endLoading');
		return response;
	},
	(err) => {
		store.dispatch('endLoading');
		return Promise.reject(err);
	},
);

export default apiClient;
