import apiClient from './serviceClient';

export default {
	check() {
		return apiClient.post('auth/check');
	},
	logout() {
		return apiClient.get('auth/logout');
	}
}