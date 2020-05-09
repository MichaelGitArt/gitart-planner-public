import apiClient from './serviceClient';

export default {
	getGroups() {
		return apiClient.post('group/get');
	},
	create(name) {
		return apiClient.post('group/create', { name });
	},
}