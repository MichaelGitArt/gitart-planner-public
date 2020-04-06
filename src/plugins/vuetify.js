import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
	breakpoint: {
		thresholds: {
			xs: 0,
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1200,
		},
		scrollBarWidth: 24,
	},
})