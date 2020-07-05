export default {
	members(state) {
		return state.group.members;
	},
	group(state) {
		return state.loading ? null : state.group;
	},
	isAdmin(state) {
		return state.group.isAdmin;
	},
	isPrimary(state) {
		return state.group.isPrimary;
	},
};
