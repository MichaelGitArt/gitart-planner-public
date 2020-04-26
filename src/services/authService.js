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
	},
	updateProfile(slug, updateObj) {
		return apiClient.post('auth/profile/' + slug + '/update', updateObj);
	},
	checkFreeSlug(slug, source) {
		return apiClient.post('auth/checkFreeSlug', {
			slug
		}, {
			cancelToken: source.token
		});
	}
}