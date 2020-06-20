import apiClient from './serviceClient';

export default {
	getGroups() {
		return apiClient.post('group/get');
	},
	getGroup(code) {
		return apiClient.post('group/get/' + code);
	},
	create(name) {
		return apiClient.post('group/create', { name });
	},
	join(code) {
		return apiClient.post('group/join', { code });
	},
	removeMember(removeData) {
		return apiClient.post('group/removeMember', removeData);
	},
};
