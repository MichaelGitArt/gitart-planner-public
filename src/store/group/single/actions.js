import router from '@/router';
import store from '@/store';
import groupService from '@/services/groupService';

export default {
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
	confirmLeaveGroup({ commit }) {
		commit('setModalType', 'group-leave');
		commit('setModal', true);
	},
	confirmRemoveGroup({ commit }) {
		commit('setModalType', 'group-destroy');
		commit('setModal', true);
	},
	leaveGroup({ dispatch, commit, rootGetters, state }) {
		const user = rootGetters['auth/user'];
		return dispatch(
			'group/removeFromGroup',
			{ groupCode: state.code, userSlug: user.slug },
			{ root: true },
		)
			.then(({ data }) => {
				if (data.success) {
					commit('group/removeGroup', state.code, { root: true });
				}

				commit('setModalLoading', true);

				if (data.success) {
					commit('setModal', false);
					commit('clearState');
					router.push({ name: 'GroupMain' });
				} else {
					commit('setInfoModal', true);
					commit('setInfoModalContent', { message: data.message });
				}
			})
			.finally(() => {
				commit('setModalLoading', false);
			});
	},
	destroyGroup({ dispatch, commit }) {
		commit('setInfoModal', true);
		commit('setInfoModalContent', { message: 'Функція у розробці' });
	},
	updateGroup({ commit, state }, payload) {
		groupService.updateGroup(payload).then(({ data }) => {
			if (data.success) {
				console.log(data.group);
				commit('updateGroup', data.group);
				commit(
					'group/updateGroup',
					{ code: state.code, updateFields: data.group },
					{ root: true },
				);
			}
		});
	},
};
