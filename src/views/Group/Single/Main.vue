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
					<single-group-fast-action
						@leaveGroup="confirmLeaveGroup"
						v-if="!loading"
						:is-admin="isAdmin"
					/>
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

				<router-view />
			</template>
		</base-content-card>

		<v-dialog :persistent="modalLoading" v-model="modal" max-width="340">
			<v-card>
				<v-card-title class="headline">Вийти з групи?</v-card-title>

				<v-card-text>
					Ти зможеш пізніше знову приєднатися.
				</v-card-text>

				<v-card-actions class="flex-wrap justify-end">
					<v-btn
						color="grey "
						:disabled="modalLoading"
						text
						@click="modal = false"
					>
						Залишитися
					</v-btn>

					<v-btn
						color="green darken-1"
						:disabled="modalLoading"
						text
						@click="leaveGroup"
					>
						{{ modalLoading ? 'Вихід з групи...' : 'Вийти з групи' }}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SingleGroupFastAction from '@/components/Pages/Group/SingleGroupFastAction';

export default {
	components: {
		SingleGroupFastAction,
	},
	props: {
		code: {
			type: String,
			required: true,
		},
	},
	data: () => ({
		modal: false,
		modalLoading: false,
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
	methods: {
		// openModal(modal)
		confirmLeaveGroup() {
			this.modal = true;
		},
		leaveGroup() {
			this.modalLoading = true;
			this.$store
				.dispatch('group/single/leaveGroup')
				.then((result) => {
					// if (result.success) {
					// 	this.modal = false;
					// 	this.$router.push({ name: 'GroupMain' });
					// }
				})
				.finally(() => {
					this.modalLoading = false;
				});
		},
	},
	computed: {
		...mapGetters('group/single', ['group']),
		...mapState('group/single', ['actionLoading', 'loading']),
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
		border-color: map-get($orange, 'base');
	}
}
</style>
