<template>
	<div>
		<v-dialog
			:persistent="mainModal.loading"
			v-model="modalState"
			max-width="340"
		>
			<component
				:is="activeModal"
				:loading="mainModal.loading"
				@close="closeModal"
			></component>
		</v-dialog>

		<v-dialog v-model="infoModalState" max-width="270px">
			<v-card>
				<v-card-title class="headline" v-text="infoModal.title" />
				<v-card-text v-text="infoModal.message" />

				<v-card-actions class="justify-end">
					<v-btn color="green" text @click="setInfoModal(false)">
						Закрити
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import GroupModalLeave from '@/components/Pages/Group/Single/Modals/GroupModalLeave';
import { mapMutations, mapState } from 'vuex';
import GroupModalDestroy from '@/components/Pages/Group/Single/Modals/GroupModalDestroy';

export default {
	components: {
		GroupModalLeave,
		GroupModalDestroy,
	},
	data: () => ({
		modalTypes: {
			'group-leave': 'GroupModalLeave',
			'group-destroy': 'GroupModalDestroy',
		},
	}),
	methods: {
		...mapMutations('group/single', ['setModal', 'setInfoModal']),
		closeModal() {
			this.setModal(false);
		},
	},
	computed: {
		modalState: {
			set(value) {
				this.setModal(value);
			},
			get() {
				return this.mainModal.status;
			},
		},
		infoModalState: {
			set(value) {
				this.setInfoModal(value);
			},
			get() {
				return this.infoModal.status;
			},
		},
		...mapState('group/single', ['mainModal', 'infoModal']),
		activeModal() {
			if (!this.mainModal.type) return null;
			return this.modalTypes[this.mainModal.type];
		},
	},
};
</script>

<style scoped></style>
