import apiClient from './serviceClient';

export default {
	create(name) {
		return apiClient.post('group/create', { name });
	},
}