export default {
	state: {
		user: null,
		checked: false
	},
	mutations: {},
	actions: {},
	getters: {
		userChecked(state) {
			return state.checked;
		},
		user(state) {
			return state.user;
		}
	}
}