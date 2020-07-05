<template>
	<div>
		<validation-observer ref="observer" v-slot="{ touched }">
			<v-form @submit.prevent="submit">
				<settings-section title="Загальні налаштування">
					<validation-provider
						name="Назва"
						rules="required|min:3|max:15"
						v-slot="{ errors }"
					>
						<v-text-field
							v-model="name"
							:error-messages="errors"
							:counter="15"
							label="Назва"
							class="mb-3"
							required
						></v-text-field>
					</validation-provider>

					<v-text-field
						v-model="code"
						disabled
						label="Код групи"
						required
					></v-text-field>

					<v-flex class="d-flex justify-end">
						<v-btn type="submit" color="success">Зберегти</v-btn>
					</v-flex>
				</settings-section>
			</v-form>
		</validation-observer>

		<v-col cols="12">
			<v-divider></v-divider>
		</v-col>

		<settings-section>
			<v-flex class="d-flex justify-space-between flex-sm-nowrap flex-wrap">
				<div>
					<div class="text-subtitle-1 font-weight-bold">Вийти з групи</div>
					<div class="text-body-2 ">
						Переконайся що у групі є інший староста
					</div>
				</div>
				<v-btn
					@click="confirmLeaveGroup"
					class="error--text ml-sm-3 mt-sm-0 mt-2"
					outlined
					>Вийти з групи</v-btn
				>
			</v-flex>
			<v-divider class="my-4"></v-divider>
			<v-flex class="d-flex justify-space-between flex-sm-nowrap flex-wrap">
				<div>
					<div class="text-subtitle-1 font-weight-bold">Видалити групу</div>
					<div class="text-body-2 ">
						Усі учасники групи більше не зможуть переглядати матеріали групи.
						Можливо краще передати керування іншому учаснику та покинути групу
					</div>
				</div>
				<v-btn
					@click="confirmRemoveGroup"
					class="error--text ml-sm-3 mt-sm-0 mt-2"
					outlined
					>Видалити групу</v-btn
				>
			</v-flex>
		</settings-section>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import SettingsSection from '@/components/General/SettingsSection';

export default {
	components: {
		ValidationProvider,
		ValidationObserver,
		SettingsSection,
	},
	data: () => ({
		updateLoading: false,
		name: '',
		code: '',
	}),
	mounted() {
		this.name = this.group.name;
		this.code = this.group.code;
	},
	methods: {
		...mapActions('group/single', ['confirmLeaveGroup', 'confirmRemoveGroup']),
		submit() {
			this.$refs.observer.validate().then((valid) => {
				if (!valid) return;

				this.updateLoading = true;

				this.$store
					.dispatch('group/single/updateGroup', {
						groupCode: this.group.code,
						updateFields: { name: this.name },
					})
					.finally(() => {
						this.updateLoading = true;
					});
			});
		},
	},
	computed: {
		...mapGetters('group/single', ['group']),
	},
};
</script>

<style scoped></style>
