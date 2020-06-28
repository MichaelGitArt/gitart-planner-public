<template>
	<profile-layout :profile="user" personal>
		<transition name="fade-slide" mode="out-in" appear>
			<router-view></router-view>
		</transition>
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
