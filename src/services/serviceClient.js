import axios from 'axios';
import loadingStore from '@/store'

const apiClient = axios.create({
	baseURL: `${process.env.VUE_APP_URL}/api`,
	headers: {
		'Content-Type': 'application/json'
	}
})

apiClient.interceptors.request.use(config => { // Called on request
	loadingStore.dispatch('startLoading');
	return config
})
apiClient.interceptors.response.use(response => { // Called on response
	loadingStore.dispatch('endLoading');
	return response
})

export default apiClient