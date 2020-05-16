import groupService from '@/services/groupService';

export default {
	state: {
		groups: [],
	},
	getters: {
		getGroups(state) {
			return state.groups;
		},
	},
	mutations: {
		addGroup(state, group) {
			if (Array.isArray(group)) {
				state.groups.push(...group);
			} else {
				state.groups.push(group);
			}
		},
		setGroups(state, groups) {
			state.groups.push(...groups);
			console.log(state.groups);
		},
	},
	actions: {
		fetchGroups({ commit }) {
			groupService.getGroups().then(({ data }) => {
				if (data.success) {
					commit('setGroups', data.groups);
				}
			});
		},
		createGroup({ commit }, name) {
			return groupService.create(name).then(({ data }) => {
				if (data.success) {
					commit('addGroup', {
						isAdmin: true,
						name: data.group.name,
						code: data.group.code,
					});
				}
				return data;
			});
		},
	},
};
