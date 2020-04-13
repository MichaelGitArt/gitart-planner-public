import router from '../router';
import authService from '@/services/authService';

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
			authService.logout()
				.then(({ data }) => {
					if (data.success) {
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