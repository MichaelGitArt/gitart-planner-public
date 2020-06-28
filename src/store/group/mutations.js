export default {
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
	removeGroup(state, code) {
		state.groups = state.groups.filter((group) => group.code !== code);
	},
	updateGroup(state, { code, updateFields }) {
		const groupIndex = state.groups.findIndex((group) => group.code === code);
		state.groups[groupIndex] = {
			...state.groups[groupIndex],
			...updateFields,
		};
	},
};
