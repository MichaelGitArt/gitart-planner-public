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
		checkUser({ commit, dispatch }) {
			authService.check().then(({ data }) => {
				if (data.auth) {
					commit("setUser", data.user);
					dispatch("fetchGroups");
					return;
				}
				commit("setUser", null);
			});
		},
		logout({ commit }) {
			authService.logout()
				.then(({ data }) => {
					if (data.success) {
						commit('setUser', null);
						if (router.currentRoute.path !== '/') {
							router.push("/");
						}
					}
				});
		},
		getProfile(ctx, slug) {
			return authService.getProfile(slug)
				.then(({ data }) => {
					return data.user;
				})
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