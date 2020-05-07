import groupService from '@/services/groupService';

export default {
	state: {
		value: 'my value'
	},
	getters: {
	},
	mutations: {
	},
	actions: {
		createGroup({ commit }, name) {
			// return groupService.create...
		}
	}
};