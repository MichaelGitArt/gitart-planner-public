<template>
	<v-container>
		<base-content-card icon="mdi-account-group">
			<template #after-heading>
				<v-skeleton-loader type="heading" v-if="loading" class="mb-2">
				</v-skeleton-loader>
				<v-skeleton-loader type="text" v-if="loading"> </v-skeleton-loader>
				<template v-else>
					<div class="text-lg-h5 text-h6 mb-1" v-text="group.name" />
					<p class="ma-0 caption header-code" v-text="code" />
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
				<v-tabs>
					<v-tab v-for="tab in tabs" :to="tab.to" :key="tab.to.name">{{
						tab.name
					}}</v-tab>
				</v-tabs>
				<v-divider class="mb-3"></v-divider>

				<router-view></router-view>
			</template>
		</base-content-card>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		code: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		loading: true,
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
	computed: {
		...mapGetters('group/single', ['group']),
	},
	mounted() {
		this.$store.dispatch('group/single/getGroup', this.code).then(() => {
			this.loading = false;
		});
	},
};
</script>

<style lang="scss" scoped>
.header-code::before {
	content: '#';
}
</style>
