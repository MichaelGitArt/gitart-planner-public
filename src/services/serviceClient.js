import axios from 'axios';
import loadingStore from '@/store'

const apiClient = axios.create({
	baseURL: `${process.env.VUE_APP_URL}/api`,
	headers: {
		'Content-Type': 'application/json'
	}
})

apiClient.interceptors.request.use(config => {
	loadingStore.dispatch('startLoading');
	return config
})

apiClient.interceptors.response.use(
	response => {
		loadingStore.dispatch('endLoading');
		return response
	},
	err => {
		loadingStore.dispatch('endLoading');
		return Promise.reject(err);
	})

export default apiClient