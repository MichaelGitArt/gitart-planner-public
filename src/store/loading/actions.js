export default {
	startLoading({ commit }) {
		commit('addLoading');
	},
	endLoading({ commit }) {
		commit('removeLoading');
	},
};
