<template>
	<div>
		<v-menu offset-y left transition="slide-y-transition">
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon class="group-settings-icon" v-on="on" v-bind="attrs">
					<v-icon color="green lighten-1">{{
						isAdmin ? 'mdi-cog' : 'mdi-dots-vertical'
					}}</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item v-if="isAdmin" link :to="{ name: 'GroupSingleSettings' }">
					Керувати
				</v-list-item>
				<v-list-item
					:disabled="loading"
					class="red"
					dark
					link
					@click="leaveGroup"
				>
					Покинути групу
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
export default {
	props: {
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	data: () => ({
		loading: false,
	}),
	methods: {
		leaveGroup() {
			this.loading = true;
			this.$store.dispatch('group/single/leaveGroup').finally(() => {
				this.loading = false;
			});
		},
	},
};
</script>

<style scoped>
.group-settings-icon {
	position: absolute;
	right: 5px;
	top: 5px;
}
</style>
