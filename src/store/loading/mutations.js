import NProgress from 'nprogress';

export default {
	addLoading(state) {
		state.apiWaitingCount++;
		NProgress.start();
	},
	removeLoading(state) {
		state.apiWaitingCount--;
		if (state.apiWaitingCount <= 0) {
			state.apiWaitingCount = 0;
			NProgress.done();
		} else {
			NProgress.inc();
		}
	},
};
