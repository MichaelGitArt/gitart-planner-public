export default {
	members(state) {
		return state.group.members;
	},
	group(state) {
		return state.loading ? null : state.group;
	},
	isAdmin(state) {
		return state.isAdmin;
	},
	isPrimary(state) {
		return state.isPrimary;
	},
};
