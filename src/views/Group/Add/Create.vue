<template>
	<div>
		<v-stepper vertical v-model="stage">
			<v-stepper-step :complete="stage > 1" step="1"
				>Назва групи</v-stepper-step
			>

			<v-stepper-content step="1">
				<validation-observer ref="observer">
					<v-form @submit.prevent="handleCreate" ref="form">
						<validation-provider
							name="Ім'я"
							rules="required"
							v-slot="{ errors }"
						>
							<v-text-field
								class="mb-2"
								v-model="name"
								label="Назва"
								:error-messages="errors"
							></v-text-field>
						</validation-provider>
						<v-btn :loading="loading" type="submit" color="primary"
							>Створити</v-btn
						>
					</v-form>
					<content-alert
						v-model="alert.value"
						:type="alert.type"
					></content-alert>
				</validation-observer>
			</v-stepper-content>

			<v-stepper-step :complete="stage > 2" step="2"
				>Група створена!</v-stepper-step
			>

			<v-stepper-content step="2">
				<v-card v-if="createdGroup" max-width="420" outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<v-list-item-title class="headline mb-1 font-weight-bold">{{
								createdGroup.name
							}}</v-list-item-title>
							<p class="body-2 font-weight-light">
								Додавай нових учасників групи на сторінці керування групою
							</p>
							<span class="d-flex align-center font-weight-bold">
								Код групи:
								<v-tooltip v-model="isVisibleTooltip" bottom>
									<template v-slot:activator="{}">
										<span
											@click="copyCode"
											class="clipboard-button font-font-weight-regular primary--text d-inline-flex align-center body-2 ml-3"
											v-ripple="{ class: `green--text` }"
										>
											<v-icon color="primary">mdi-link-variant</v-icon>
											{{ createdGroup.code }}
										</span>
									</template>
									<span>Код скопійовано!</span>
								</v-tooltip>
							</span>
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
							>Керувати</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-stepper-content>
		</v-stepper>
	</div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import ContentAlert from '@/components/General/ContentAlert';
import toClipboard from '@/utils/toClipboard';

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
		ContentAlert,
	},
	data: () => ({
		stage: 1,
		name: '',
		loading: false,
		result: null,
		createdGroup: null,
		isVisibleTooltip: false,
		alert: {
			value: '',
			type: 'error',
		},
	}),

	methods: {
		handleCreate() {
			this.alert.value = '';
			this.$refs.observer.validate().then((valid) => {
				if (!valid) return;
				this.loading = true;
				this.$store
					.dispatch('group/createGroup', this.name)
					.then((result) => {
						if (result.success) {
							this.createdGroup = result.group;
							this.stage++;
						} else {
							this.alert.value = result.message;
						}
					})
					.catch((err) => {
						console.log('catch here');
						this.alert.value = err.message;
					})
					.finally(() => {
						this.loading = false;
					});
			});
		},

		hideTooltip() {
			this.isVisibleTooltip = false;
		},

		showTooltip() {
			this.isVisibleTooltip = true;
		},

		copyCode() {
			toClipboard(this.createdGroup.code);
			this.showTooltip();
			setTimeout(() => {
				this.hideTooltip();
			}, 2000);
		},
	},
};
</script>

<style lang="scss" scoped>
.clipboard-button {
	cursor: pointer;
	border-bottom: 1px solid transparent;
	&:hover {
		border-bottom-color: #1976d2;
	}
}
</style>
