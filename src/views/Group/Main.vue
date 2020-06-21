<template>
	<v-container>
		<v-layout mb-4 justify-space-between align-center>
			<h1 class="font-weight-bold display-1 ">Gitart групи</h1>

			<v-btn :to="{ name: 'GroupCreate' }" fab color="success">
				<v-icon dark>mdi-plus</v-icon>
			</v-btn>
		</v-layout>
		<v-row>
			<v-col cols="12" sm="6" v-for="group in getGroups" :key="group.code">
				<router-link
					tag="div"
					:to="{ name: 'GroupSingle', params: { code: group.code } }"
				>
					<v-card class="group-card">
						<div class=" d-flex align-center py-3 px-4">
							<div class="title text-h6">
								{{ group.name }}
							</div>
							<v-spacer></v-spacer>
						</div>
						<v-footer
							class="mt-3  lighten-1 text-right justify-space-between "
							:class="{
								'green white--text': group.isAdmin,
							}"
						>
							<span>{{ group.isAdmin ? 'Староста' : 'Учасник' }}</span>
							<span>Учасників: {{ group.countMembers }}</span>
						</v-footer>
					</v-card>
				</router-link>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('group', ['getGroups']),
	},
};
</script>

<style scoped lang="scss">
.group-card {
	cursor: pointer;
	transition: all 0.3s;

	&:hover {
		transform: translate(0, -4px);
	}
}
</style>
