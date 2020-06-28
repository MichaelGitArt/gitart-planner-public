export default {
	setGroup(state, group) {
		state.group = group;
	},
	setCode(state, code) {
		state.code = code;
	},
	setLoading(state, status) {
		state.loading = status;
	},
	setModalType(state, type) {
		state.mainModal.type = type;
	},
	setModal(state, status) {
		state.mainModal.status = status;
	},
	setModalLoading(state, status) {
		state.mainModal.loading = status;
	},
	setInfoModal(state, status) {
		state.infoModal.status = status;
	},
	setInfoModalContent(state, { message, title = 'Щось пішло не так' }) {
		state.infoModal.message = message;
		state.infoModal.title = title;
	},
	clearState(state) {
		state.group = null;
		state.code = null;
		state.loading = true;
	},
	updateGroup(state, groupFields) {
		state.group = {
			...state.group,
			...groupFields,
		};
	},
};
