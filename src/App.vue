<template>
	<v-app>
		<the-drawer
			:nav="navLinks"
			v-if="$vuetify.breakpoint.smAndDown"
			v-model="drawer"
		></the-drawer>

		<the-menu :nav="navLinks" v-model="drawer"></the-menu>

		<v-content>
			<transition name="fade-slide" mode="out-in" appear>
				<router-view></router-view>
			</transition>
		</v-content>
	</v-app>
</template>

<script>
import TheMenu from '@/components/Interface/TheMenu';
import TheDrawer from '@/components/Interface/TheDrawer';

export default {
	name: 'App',
	components: {
		TheMenu,
		TheDrawer,
	},
	data: () => ({
		drawer: false,
		navLinks: [
			{ to: { name: 'GroupMain' }, name: 'Групи', icon: 'mdi-account-group' },
		],
	}),
	beforeCreate() {
		this.$store.dispatch('checkUser');
	},
};
</script>
