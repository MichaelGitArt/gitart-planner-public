<template>
	<v-list-item class="profile-header flex-column flex-lg-row mb-n1">
		<v-list-item-avatar
			class="profile-header__avatar align-self-start elevation-2 mt-lg-n10 mt-n8 mb-0 mb-lg-4"
			:size="$vuetify.breakpoint.lgAndUp ? 100 : 70"
		>
			<img :src="profile.avatar" :alt="profile.name" />
		</v-list-item-avatar>
		<v-list-item-content class="align-self-start align-self-lg-center">
			<h4 class="title" v-text="profile.name" />
			<slot></slot>
		</v-list-item-content>
		<v-btn
			v-if="settingsIcon"
			:to="{ name: 'MyProfileEdit' }"
			icon
			class="profile-header__settings-icon"
		>
			<v-icon color="success lighten-1">mdi-cog</v-icon>
		</v-btn>
	</v-list-item>
</template>

<script>
export default {
	props: {
		profile: {
			type: Object,
			required: true,
		},
		settingsIcon: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss">
.profile-header {
	.title {
		max-width: 100%;
	}
	min-height: 0;
	&__settings-icon {
		position: absolute;
		top: 5px;
		right: 5px;
	}
}
</style>
