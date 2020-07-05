<template>
	<div>
		<v-list>
			<member-group
				:members="byRole(['admin', 'primary'])"
				title="Старости"
				class="mb-2"
			></member-group>
			<member-group :members="byRole('member')" title="Учасники"></member-group>
		</v-list>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import MemberGroup from '@/components/Pages/Group/Single/MemberGroup';

export default {
	components: {
		MemberGroup,
	},
	methods: {
		log() {
			console.log('good');
		},
	},
	computed: {
		...mapGetters('group/single', ['members']),
		byRole() {
			return (role) =>
				this.members.filter((member) => {
					return Array.isArray(role)
						? role.includes(member.role)
						: member.role === role;
				});
		},
	},
};
</script>

<style scoped></style>
