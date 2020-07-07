<template>
	<div>
		<base-page-back :route="{ name: 'MyProfile' }" class="mb-5">
			<h2>Редагування</h2>
		</base-page-back>

		<validation-observer ref="observer" v-slot="{ touched }">
			<v-form @submit.prevent="submit">
				<settings-section title="Загальні налаштування">
					<validation-provider
						name="Ім'я"
						rules="required|min:3|max:30"
						v-slot="{ errors }"
					>
						<v-text-field
							:error-messages="mergeErrors('name', errors)"
							color="green"
							v-model="name"
							:counter="30"
							label="Ім'я"
							@input="resetError('name')"
						></v-text-field>
					</validation-provider>
					<validation-provider
						name="Нік"
						rules="required|min:5|max:20"
						v-slot="{ errors }"
					>
						<v-text-field
							:error-messages="mergeErrors('slug', errors)"
							v-model.trim="slug"
							:counter="20"
							color="green"
							:loading="slugLoading"
							label="Нік"
							:hint="slugHint"
							@input="slugInput"
						></v-text-field>
					</validation-provider>
					<v-row class="pt-2" justify="end">
						<v-col cols="auto" class="d-flex flex-wrap justify-end mb-n3">
							<v-btn
								class="mb-3"
								color="error"
								:to="{ name: 'MyProfile' }"
								v-if="touched"
								>Відмінити</v-btn
							>
							<v-btn
								type="submit"
								class="ml-3 mb-3"
								color="success"
								:loading="loading"
								>Зберегти</v-btn
							>
						</v-col>
					</v-row>
				</settings-section>
			</v-form>
		</validation-observer>

		<settings-section>
			<avatar-upload />
		</settings-section>
	</div>
</template>

<script>
import axios from 'axios';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import SettingsSection from '@/components/General/SettingsSection';

import authService from '@/services/authService';
import AvatarUpload from '@/components/Pages/Profile/AvatarUpload';

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
		SettingsSection,
		AvatarUpload,
	},
	data: () => ({
		name: '',
		slug: '',
		slugErrors: [],
		slugHint: null,
		slugLoading: false,
		validationErrors: [],
		loading: false,
	}),
	created() {
		this.name = this.user.name;
		this.slug = this.user.slug;
	},
	methods: {
		async submit() {
			const valid = await this.$refs.observer.validate();
			if (!valid) return;

			this.loading = true;

			const updateObj = {
				name: this.name,
				slug: this.slug,
			};
			authService
				.updateProfile(this.user.slug, updateObj)
				.then(({ data, status }) => {
					console.log('not catch');

					if (data.success) {
						this.$store.commit('auth/setUser', data.user);
						this.$toast.success('Профіль оновлено!');
						return;
					}

					if (status === 422) {
						this.parseSlugRes(data.slugValidation);

						if (data.errors) {
							this.validationErrors.push(...data.errors);
						}
						this.$toast.error(
							'Не вдалося оновини профіль. Перевір поля та спробуй знову',
						);
						return;
					}

					// To catch block
					throw new Error();
				})
				.catch(() => {
					this.$toast.error(
						'Щось пішло не так. Спробуй ще або звернись до адміністратора',
					);
				})
				.finally(() => {
					this.loading = false;
				});
		},
		checkSlug() {
			this.slugHint = null;
			this.$refs.observer.validate().then((valid) => {
				if (!valid) return;

				this.slugLoading = true;
				if (this.source) {
					this.source.cancel('Відмінити перевірку');
				}

				this.source = axios.CancelToken.source();

				authService
					.checkFreeSlug(this.slug, this.source)
					.then(({ data }) => {
						this.parseSlugRes(data);
					})
					.catch((err) => {
						if (!axios.isCancel(err)) {
							console.log(err);
						}
					})
					.finally(() => {
						this.slugLoading = false;
					});
			});
		},
		parseSlugRes(res) {
			if (res.message && !res.status) {
				// Returned error message
				this.validationErrors.push({
					param: 'slug',
					msg: res.message,
				});
			} else if (res.message && res.status) {
				//	Returned hint
				this.slugHint = res.message;
			} else {
				// Return status "false"
				this.slugHint = 'Нік вільний';
			}
		},
		resetError(field) {
			this.validationErrors = this.validationErrors.filter(
				(err) => err.param !== field,
			);
		},
		slugInput() {
			this.resetError('slug');
			this.checkSlug();
		},
	},
	computed: {
		mergeErrors() {
			return (field, errors = []) => {
				let fieldValidationErrors = this.validationErrors.filter(
					(err) => err.param === field,
				);

				fieldValidationErrors = fieldValidationErrors.map((err) => err.msg);

				return [...errors, ...fieldValidationErrors];
			};
		},
	},
};
</script>
