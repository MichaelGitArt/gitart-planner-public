<template>
	<div>
		<v-list>
			<v-list-item
				dense
				v-for="member in members"
				:key="member.slug"
				:class="{ highlighted: member.slug === user.slug }"
				active-class="highlighted"
			>
				<v-list-item-content>
					<v-list-item-title>
						{{ member.name }} {{ member.slug === user.slug ? '(Ти)' : '' }}
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ member.role === 'admin' ? 'Адміністратор' : 'Учасник' }}
					</v-list-item-subtitle>
				</v-list-item-content>

				<v-list-item-action>
					<v-btn icon :to="{ name: 'Profile', params: { slug: member.slug } }">
						<v-icon dark>mdi-account-arrow-right</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('group/single', ['members']),
	},
};
</script>

<style scoped></style>
