<template>
	<v-container>
		<base-content-card
			icon="mdi-account-group"
			class="group-page"
			:class="{ 'group-page--admin': isAdmin }"
		>
			<template #after-heading>
				<v-skeleton-loader type="heading" v-if="loading" class="mb-2" />
				<v-skeleton-loader type="text" v-if="loading" />
				<template v-else>
					<div class="text-lg-h5 text-h6 mb-1" v-text="group.name" />
					<p class="ma-0 caption header-code" v-text="code" />
					<fast-action v-if="!loading" :is-admin="isAdmin" />
				</template>
			</template>

			<template v-if="loading">
				<v-flex rounded class="pa-4 d-flex">
					<v-skeleton-loader
						v-for="tab in tabs"
						:key="tab.to.name"
						type="button"
						class="mr-2"
					></v-skeleton-loader>
				</v-flex>
				<v-skeleton-loader type="text"></v-skeleton-loader>
			</template>

			<template v-else>
				<v-tabs color="success" :hide-slider="isSettingsPage">
					<v-tab
						class="green--text"
						v-for="tab in tabs"
						:to="tab.to"
						:key="tab.to.name"
						>{{ tab.name }}</v-tab
					>
				</v-tabs>
				<v-divider class="mb-3" />

				<transition name="fade-slide" mode="out-in">
					<router-view />
				</transition>
			</template>
		</base-content-card>
		<group-modals />
	</v-container>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex';
import FastAction from '@/components/Pages/Group/Single/FastAction';
import GroupModals from '@/components/Pages/Group/Single/Modals/GroupModals';

export default {
	components: {
		FastAction,
		GroupModals,
	},
	props: {
		code: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		tabs: [
			{
				to: { name: 'GroupSingleFlow' },
				name: 'Потік',
			},
			{
				to: {
					name: 'GroupSingleSchedule',
				},
				name: 'Розклад',
			},
			{
				to: {
					name: 'GroupSingleMembers',
				},
				name: 'Учасники',
			},
		],
	}),
	mounted() {
		this.$store.dispatch('group/single/getGroup', this.code);
	},

	computed: {
		...mapState('group/single', ['loading']),
		...mapGetters('group/single', ['group']),

		isSettingsPage() {
			return this.$route.name === 'GroupSingleSettings';
		},
		isAdmin() {
			return !this.loading && this.group.isAdmin;
		},
	},
};
</script>

<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_colors.scss';

.header-code::before {
	content: '#';
}

.group-page {
	border-top: 3px solid transparent;
	&--admin {
		border-color: map-get($green, 'base');
	}
}
</style>
