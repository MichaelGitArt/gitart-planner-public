import apiClient from './serviceClient';

export default {
	check() {
		return apiClient.post('auth/check');
	},
	logout() {
		return apiClient.post('auth/logout');
	},
	getProfile(slug) {
		return apiClient.post('auth/profile/' + slug)
	}
}