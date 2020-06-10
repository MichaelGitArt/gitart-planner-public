import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import vuetify from './plugins/vuetify';
import userExpration from './plugins/user-expantion';
import '@/utils/VeeValidate.js';

// Import base components
import '@/components/Base';

import '@/scss/main.scss';

Vue.config.productionTip = false;

Vue.use(userExpration);

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');
