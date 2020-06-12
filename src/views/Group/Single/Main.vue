<template>
	<v-container>
		<base-content-card icon="mdi-account-group" :title="group.name">
			<v-divider class="mb-3"></v-divider>
			<p v-text="group.code" />
			<ul>
				<li v-for="grUser in group.users" :key="grUser.code">
					<router-link :to="{ name: 'Profile', params: { slug: grUser.slug } }">
						{{ grUser.name }} {{ grUser.slug === user.slug ? '(Ти)' : '' }}
					</router-link>
				</li>
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
