<template>
	<v-card>
		<v-card-title class="headline">Видалити групу?</v-card-title>

		<v-card-text
			>Група буде видалена повністю без можливостві відновлення
		</v-card-text>

		<v-card-actions class="flex-wrap justify-end">
			<v-btn color="grey " :disabled="loading" text @click="close">
				Відмінити
			</v-btn>

			<v-btn
				color="green darken-1"
				:disabled="loading"
				text
				@click="destroyGroup"
			>
				{{ loading ? 'Видалення...' : 'Видалити' }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		...mapActions('group/single', ['destroyGroup']),
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style scoped></style>
