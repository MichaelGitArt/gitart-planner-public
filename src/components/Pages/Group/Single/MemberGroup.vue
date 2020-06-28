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
				</v-list-item-title>
				<v-list-item-subtitle>
					{{ member.isAdmin ? 'Староста' : 'Учасник' }}
				</v-list-item-subtitle>
			</v-list-item-content>

			<v-list-item-action v-if="!member.isYou">
				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-btn @click.stop.prevent="" v-on.stop.prevent="on" icon>
							<v-icon dark>mdi-dots-vertical</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item>
							<v-list-item-title>Вилучити</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-list-item-action>
		</v-list-item>
	</div>
</template>

<script>
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
};
</script>
