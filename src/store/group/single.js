import router from '@/router';
import store from '@/store';

export default {
	namespaced: true,
	state: {
		group: null,
		code: null,
		loading: true,
		actionLoading: false,
	},
	mutations: {
		setGroup(state, group) {
			state.group = group;
		},
		setCode(state, code) {
			state.code = code;
		},
		setLoading(state, status) {
			state.loading = status;
		},
		setActionLoading(state, status) {
			state.loading = status;
		},
	},
	actions: {
		getGroup({ dispatch, state, commit }, code) {
			commit('setLoading', true);
			commit('setCode', code);
			return new Promise((resolve) => {
				if (state.group && state.group.code === code) {
					return resolve(state.group);
				}
				dispatch('group/fetchGroup', code, { root: true }).then((result) => {
					if (result.success) {
						commit('setGroup', result.group);
						return resolve(result.group);
					}
					switch (result.statusCode) {
						case 404:
							router.push({ name: 'NotFound' });
							break;
						default:
							router.push({ name: 'GroupMain' });
							store.$toast.open({
								message: result.statusCode + ': ' + result.message,
								type: 'error',
							});
					}
				});
			}).finally(() => {
				commit('setLoading', false);
			});
		},
		leaveGroup({ dispatch, getters, rootGetters, state }) {
			const user = rootGetters['auth/user'];
			dispatch(
				'group/removeFromGroup',
				{ groupCode: state.code, userSlug: user.slug },
				{ root: true },
			);
		},
	},
	getters: {
		members(state) {
			return state.group.members;
		},
		group(state) {
			return state.loading ? null : state.group;
		},
	},
};
