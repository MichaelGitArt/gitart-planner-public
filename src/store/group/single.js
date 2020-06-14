import router from '@/router';
import store from '@/store';

export default {
	namespaced: true,
	state: {
		group: null,
		code: null,
	},
	mutations: {
		setGroup(state, group) {
			state.group = group;
		},
		setCode(state, code) {
			state.code = code;
		},
	},
	actions: {
		getGroup({ dispatch, state, commit }, code) {
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
			});
		},
		leaveGroup() {},
	},
	getters: {
		members(state) {
			return state.group.members;
		},
		group(state) {
			return state.group;
		},
	},
};
