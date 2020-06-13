import groupService from '@/services/groupService';
import groupSingleStore from './single';

export default {
	namespaced: true,
	modules: {
		single: groupSingleStore,
	},
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
		fetchGroup(_, groupCode) {
			return new Promise((resolve) => {
				groupService.getGroup(groupCode).then(({ data }) => {
					resolve(data);
				});
			});
		},
		createGroup({ commit }, name) {
			return groupService.create(name).then(({ data }) => {
				if (data.success) {
					commit('addGroup', {
						isAdmin: data.group.isAdmin,
						name: data.group.name,
						code: data.group.code,
						countMembers: 1,
					});
				}
				return data;
			});
		},
		joinGroup({ commit }, code) {
			return groupService.join(code).then(({ data }) => {
				if (data.success) {
					commit('addGroup', {
						isAdmin: data.group.isAdmin,
						name: data.group.name,
						code: data.group.code,
						countMembers: data.group.countMembers,
					});
				}
				return data;
			});
		},
	},
};
