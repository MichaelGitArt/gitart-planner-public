<template>
	<div>
		Settings
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('group/single', ['group']),
	},
};
</script>

<style scoped></style>
