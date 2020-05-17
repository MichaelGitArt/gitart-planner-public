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
				<v-card>
					<div class="d-flex align-center py-3 px-4">
						<router-link
							tag="h4"
							:to="{ name: 'GroupSingle', params: { code: group.code } }"
						>
							{{ group.name }}
						</router-link>
						<v-spacer></v-spacer>
						<v-btn
							icon
							:to="{ name: 'GroupSingle', params: { code: group.code } }"
						>
							<v-icon>mdi-arrow-right</v-icon>
						</v-btn>
					</div>
					<v-footer
						class="mt-3 green white--text lighten-1 text-right justify-end"
					>
						Учасників: {{ group.countMembers }}
					</v-footer>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters(['getGroups']),
	},
};
</script>
