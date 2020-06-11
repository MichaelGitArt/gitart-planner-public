<template>
	<v-container>
		<base-content-card icon="mdi-account-group" :title="group.name">
			<v-divider class="mb-3"></v-divider>
			<ul>
				<li v-for="user in group.users" :key="user.code" v-text="user.name" />
			</ul>
		</base-content-card>
	</v-container>
</template>

<script>
export default {
	props: {
		group: {
			type: Object,
			required: true,
		},
	},
	name: 'GroupSingle',
};
</script>

<style scoped></style>
