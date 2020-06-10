<template>
	<v-card class="content-card pa-3 ">
		<div class="d-flex grow flex-wrap">
			<v-sheet
				:color="color"
				:width="icon ? 90 : '100%'"
				:max-height="icon ? 90 : 'auto'"
				class="content-card__heading pa-7  mb-n6 elevation-6"
				dark
			>
				<v-icon v-if="icon" size="32" v-text="icon" />

				<slot v-else-if="$slots.heading" name="heading"></slot>

				<div
					v-else-if="title"
					class="display-1 font-weight-light"
					v-text="title"
				/>
			</v-sheet>

			<div
				v-if="title && icon"
				class="display-1 font-weight-light ml-4"
				v-text="title"
			/>

			<slot name="after-heading" v-if="$slots['after-heading']"></slot>
		</div>
		<slot></slot>
	</v-card>
</template>

<script>
export default {
	name: 'BaseContentCard',
	props: {
		color: {
			type: String,
			default: 'success',
		},
		icon: {
			type: String,
			default: undefined,
		},
		title: {
			type: String,
			default: '',
		},
	},
};
</script>

<style lang="scss">
.content-card {
	margin-top: 40px;

	&__heading {
		position: relative;
		top: -40px;
	}
}
</style>
