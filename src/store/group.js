import groupService from '@/services/groupService';

export default {
	state: {
		groups: [],
		roleTypes: ['admin', 'member']
	},
	getters: {
	},
	mutations: {
		addGroup(state, group) {
			if (state.roleTypes.includes(group.role)) {
				state.groups.push(group);
			}
		}
	},
	actions: {
		createGroup({ commit }, name) {
			return groupService.create(name)
				.then(({ data }) => {
					if (data.success) {
						commit('addGroup', data.group);
					}
					return data;
				})
		}
	}
};