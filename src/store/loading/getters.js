export default {
	isLoading(state) {
		return state.apiWaitingCount !== 0;
	},
};
