<template>
	<v-card>
		<v-card-title class="headline">Вийти з групи?</v-card-title>

		<v-card-text>
			Ти зможеш пізніше знову приєднатися.
		</v-card-text>

		<v-card-actions class="flex-wrap justify-end">
			<v-btn color="grey " :disabled="loading" text @click="close">
				Залишитися
			</v-btn>

			<v-btn
				color="green darken-1"
				:disabled="loading"
				text
				@click="leaveGroup"
			>
				{{ loading ? 'Вихід з групи...' : 'Вийти з групи' }}
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
		...mapActions('group/single', ['leaveGroup']),
		close() {
			this.$emit('close');
		},
	},
};
</script>

<style scoped></style>
