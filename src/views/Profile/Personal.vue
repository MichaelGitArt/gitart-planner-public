<template>
	<profile-layout :profile="user" personal>
		<router-view></router-view>
	</profile-layout>
</template>

<script>
import ProfileLayout from '@/components/Pages/Profile/Layout';

export default {
	components: {
		ProfileLayout,
	},
};
</script>
