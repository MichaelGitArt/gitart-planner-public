import router from '../router';

export default {
	state: {
		user: null,
		checked: false
	},
	mutations: {
		setUser(state, user) {
			if (typeof user === 'object') {
				state.user = user;
			} else {
				state.user = null
			}
			state.checked = true;
		}
	},
	actions: {
		logout({ commit }) {
			fetch(`${process.env.VUE_APP_URL}/api/auth/logout`, {
				method: "POST"
			})
				.then(res => res.json())
				.then(resData => {
					if (resData.success) {
						commit('setUser', null);
						router.go('/')
					}
				});
		}
	},
	getters: {
		userChecked(state) {
			return state.checked;
		},
		user(state) {
			return state.user;
		}
	}
}