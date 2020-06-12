<template>
	<div>
		<v-stepper vertical v-model="stage">
			<v-stepper-step :complete="stage > 1" step="1">Код</v-stepper-step>

			<v-stepper-content step="1">
				<validation-observer ref="observer">
					<v-form @submit.prevent="handleJoin" ref="form">
						<validation-provider
							name="Код групи"
							rules="required"
							v-slot="{ errors }"
						>
							<v-text-field
								class="mb-2"
								v-model="code"
								label="Код групи"
								:error-messages="errors"
							></v-text-field>
						</validation-provider>
						<v-btn :loading="loading" type="submit" color="primary"
							>Приєднатися</v-btn
						>
					</v-form>
				</validation-observer>
			</v-stepper-content>

			<v-stepper-step :complete="stage > 2" step="2">Готово!</v-stepper-step>

			<v-stepper-content step="2">
				<v-card v-if="createdGroup" max-width="420" outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<v-list-item-title class="headline mb-1 font-weight-bold">{{
								createdGroup.name
							}}</v-list-item-title>
							<p class="body-2 font-weight-light">
								Тепер ти учасник групи, переглянь її!
							</p>
						</v-list-item-content>

						<v-icon large color="green" class="px-1 hidden-sm-and-down"
							>mdi-checkbox-marked-circle</v-icon
						>
					</v-list-item>

					<v-card-actions>
						<v-btn
							:to="{ name: 'GroupSingle', params: { code: createdGroup.code } }"
							small
							color="success"
							>Переглянути</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-stepper-content>
		</v-stepper>
	</div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data: () => ({
		stage: 1,
		code: '',
		loading: false,
		result: null,
		createdGroup: null,
		isVisibleTooltip: false,
	}),
	methods: {
		handleJoin() {
			this.$refs.observer.validate().then((valid) => {
				if (!valid) return;
				this.loading = true;
				this.$store
					.dispatch('group/joinGroup', this.code)
					.then((result) => {
						if (result.success) {
							this.createdGroup = result.group;
							this.stage++;
						} else {
							this.$toast.error(result.message, {
								duration: 5000,
							});
						}
					})
					.catch((err) => {
						console.log('err', err);
						this.$toast.error(err.message, {
							duration: 5000,
						});
					})
					.finally(() => {
						this.loading = false;
					});
			});
		},
	},
};
</script>

<style></style>
