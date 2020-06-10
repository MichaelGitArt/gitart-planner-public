import { mapGetters } from 'vuex';

export default {
	install(vue) {
		vue.mixin({
			computed: {
				...mapGetters('auth', ['userChecked', 'user']),
			},
		});
	},
};
