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
import { mapMutations, mapState } from 'vuex';
import GroupModalLeave from '@/components/Pages/Group/Single/Modals/GroupModalLeave';
import GroupModalDestroy from '@/components/Pages/Group/Single/Modals/GroupModalDestroy';
import GroupModalSetStatus from '@/components/Pages/Group/Single/Modals/GroupModalSetStatus';

export default {
	components: {
		GroupModalLeave,
		GroupModalDestroy,
		GroupModalSetStatus,
	},
	data: () => ({
		modalTypes: {
			'group-leave': 'GroupModalLeave',
			'group-destroy': 'GroupModalDestroy',
			'group-set-status': 'GroupModalSetStatus',
		},
	}),
	methods: {
		...mapMutations('group/single', ['setModal', 'setInfoModal']),
		closeModal() {
			this.setModal({ status: false });
		},
	},
	computed: {
		modalState: {
			set(status) {
				this.setModal({ status });
			},
			get() {
				return this.mainModal.status;
			},
		},
		infoModalState: {
			set(status) {
				this.setInfoModal({ status });
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
