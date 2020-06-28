export default {
	setUser(state, user) {
		if (typeof user === 'object') {
			state.user = user;
		} else {
			state.user = null;
		}
		state.checked = true;
	},
};
