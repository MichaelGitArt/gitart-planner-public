export default {
	setUser(state, user) {
		if (typeof user === 'object') {
			state.user = user;
		} else {
			state.user = null;
		}
		state.checked = true;
	},
	updateUser(state, updateFields) {
		state.user = { ...state.user, ...updateFields };
		console.log(state.user);
	},
};
