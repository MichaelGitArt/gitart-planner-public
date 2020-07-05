<template>
	<div>
		<h3 class="ml-3">{{ title }}</h3>
		<v-divider></v-divider>
		<v-list-item
			dense
			:to="{ name: 'Profile', params: { slug: member.slug } }"
			:ripple="false"
			v-for="member in members"
			:key="member.slug"
			:class="{ highlighted: member.isYou }"
			active-class="highlighted"
		>
			<v-list-item-content>
				<v-list-item-title :class="{ 'success--text ': member.isYou }">
					{{ member.name }} {{ member.isYou ? '(Ти)' : '' }}
					<v-icon
						v-if="member.isPrimary"
						size="14"
						color="orange"
						class="primary-star"
					>
						mdi-star
					</v-icon>
				</v-list-item-title>
				<v-list-item-subtitle>
					{{ member.isAdmin ? 'Староста' : 'Учасник' }}
				</v-list-item-subtitle>
			</v-list-item-content>
			<!--<v-list-item-action v-if="!member.isYou && isAdmin">
				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-btn @click.stop.prevent="" v-on.stop.prevent="on" icon>
							<v-icon dark>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-if="(isAdmin && !member.isAdmin) || isPrimary">
							<v-list-item-title>Вилучити</v-list-item-title>
						</v-list-item>
						<v-list-item @click="confirmSetStatus" v-if="isPrimary">
							<v-list-item-title>Змінити статус</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-list-item-action>-->
		</v-list-item>
		<v-sheet
			v-if="!members.length"
			color="grey lighten-4"
			height="100"
			width="100%"
			class="text-center align-center d-flex justify-center text-md-subtitle-2 mt-4"
		>
			Надай учасникам код групи
		</v-sheet>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		members: {
			type: Array,
			required: true,
		},
	},
	methods: {
		...mapActions('group/single', ['confirmSetStatus']),
	},
	computed: {
		...mapGetters('group/single', ['isAdmin', 'isPrimary']),
	},
};
</script>

<style lang="scss" scoped>
.primary-star {
	margin-bottom: 2px;
}
</style>
