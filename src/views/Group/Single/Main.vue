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

				<transition name="fade-slide" mode="out-in" appear>
					<router-view />
				</transition>
			</template>
		</base-content-card>

		<v-dialog :persistent="modalLoading" v-model="modalState" max-width="340">
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
						@click="setModal(false)"
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

		<v-dialog v-model="infoModalState" max-width="270px">
			<v-card>
				<v-card-title class="headline">Щось пішло не так</v-card-title>

				<v-card-text>
					{{ infoModalMessage }}
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn
						color="green"
						text
						@click="
							setInfoModal(false);
							setModal(false);
						"
					>
						Закрити
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import FastAction from '@/components/Pages/Group/Single/FastAction';

export default {
	components: {
		FastAction,
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
	methods: {
		...mapActions('group/single', ['leaveGroup']),
		...mapMutations('group/single', ['setModal', 'setInfoModal']),
	},
	computed: {
		modalState: {
			set(value) {
				this.setModal(value);
			},
			get() {
				return this.modal;
			},
		},
		infoModalState: {
			set(value) {
				this.setInfoModal(value);
			},
			get() {
				return this.infoModal;
			},
		},
		...mapState('group/single', [
			'loading',
			'modal',
			'modalLoading',
			'infoModal',
			'infoModalMessage',
		]),

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
