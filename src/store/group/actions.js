import groupService from '@/services/groupService';

export default {
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
	removeFromGroup(_, { groupCode, userSlug }) {
		return groupService.removeMember({ groupCode, userSlug });
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
};
