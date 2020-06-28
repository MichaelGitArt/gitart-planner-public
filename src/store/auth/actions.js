import authService from '@/services/authService';
import router from '@/router';

export default {
	checkUser({ commit, dispatch }) {
		authService.check().then(({ data }) => {
			if (data.auth) {
				commit('setUser', data.user);
				dispatch('group/fetchGroups', null, { root: true });
				return;
			}
			commit('setUser', null);
		});
	},
	logout({ commit }) {
		authService.logout().then(({ data }) => {
			if (data.success) {
				commit('setUser', null);
				if (router.currentRoute.path !== '/') {
					router.push('/');
				}
			}
		});
	},
	getProfile(ctx, slug) {
		return authService.getProfile(slug).then(({ data }) => {
			return data.user;
		});
	},
};
