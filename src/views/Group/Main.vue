<template>
	<v-container>
		<v-layout justify-space-between align-center>
			<h1 class="font-weight-bold display-1 mb-4">Gitart групи</h1>

			<v-btn :to="{ name: 'GroupCreate' }" fab color="success">
				<v-icon dark>mdi-plus</v-icon>
			</v-btn>
		</v-layout>
		<v-row>
			<v-col cols="12" sm="6" v-for="group in getGroups" :key="group.code">
				<v-card>
					<v-toolbar flat>
						<v-toolbar-title>
							{{ group.name }}
						</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-btn icon>
							<v-icon>mdi-arrow-right</v-icon>
						</v-btn>
					</v-toolbar>
					<v-footer class="mt-2 text-right justify-end">
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
