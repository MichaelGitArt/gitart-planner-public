<template>
	<v-card>
		<v-card-title class="headline">Змінити статус</v-card-title>

		<v-card-text>
			<v-select
				item-text="name"
				item-value="id"
				:items="statuses"
				label="Статус"
				v-model="currentStatus"
			></v-select>

			<v-text-field
				label="Спеціальна назва"
				placeholder="Староста"
			></v-text-field>
		</v-card-text>

		<v-card-actions class="flex-wrap justify-end">
			<v-btn color="grey " :disabled="loading" text @click="close">
				Відмінити
			</v-btn>

			<v-btn
				color="green darken-1"
				:disabled="loading"
				text
				@click="leaveGroup"
			>
				{{ loading ? 'Збереження...' : 'Зберегти зміни' }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		statuses: [
			{ name: 'Староста', id: 'admin' },
			{ name: 'Учасник', id: 'member' },
		],
		currentStatus: 'member',
		specialName: '',
	}),
	methods: {
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style scoped></style>
