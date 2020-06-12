<template>
	<v-navigation-drawer
		clipped
		:value="value"
		@input="$emit('input', $event)"
		app
		dark
		color="green"
	>
		<v-list-item
			v-if="user"
			two-line
			:to="{ name: 'MyProfile' }"
			class="white--text"
		>
			<v-list-item-avatar class="my-2">
				<img
					src="@/assets/images/general/profile-placeholder.png"
					:alt="user.name"
				/>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title>Gitart Planner</v-list-item-title>
				<v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
		<v-divider></v-divider>

		<v-list dense nav>
			<v-list-item v-for="link in nav" :key="link.to.name" :to="link.to">
				<v-list-item-icon>
					<v-icon>{{ link.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ link.name }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	props: {
		value: Boolean,
		nav: Array,
	},
};
</script>
