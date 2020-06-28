import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import groupSingleStore from './single/index';

export default {
	namespaced: true,
	modules: {
		single: groupSingleStore,
	},
	state,
	mutations,
	actions,
	getters,
};
