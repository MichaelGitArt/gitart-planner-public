import groupService from '@/services/groupService';

export default {
	state: {
		groups: [],
		roleTypes: ['admin', 'member']
	},
	getters: {
		getGroups(state) {
			return state.groups
		}
	},
	mutations: {
		addGroup(state, group) {
			if (state.roleTypes.includes(group.role)) {
				state.groups.push(group);
			}
		}
	},
	actions: {
		fetchGroups() {
			groupService.getGroups()
				.then(({ data }) => {
					console.log(`fetchGroups -> data`, data);
				})
		},
		createGroup({ commit }, name) {
			return groupService.create(name)
				.then(({ data }) => {
					if (data.success) {
						commit('addGroup', data.group);
					}
					return data;
				})
		}
	},

};