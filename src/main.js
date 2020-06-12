import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

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
Vue.use(VueToast);

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount('#app');

store.$toast = Vue.$toast;
