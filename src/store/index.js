import Vue from 'vue'
import Vuex from 'vuex'

import authStore from './auth'
import loadingStore from './loading'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
	},
	modules: {
		auth: authStore,
		loading: loadingStore
	}
})
