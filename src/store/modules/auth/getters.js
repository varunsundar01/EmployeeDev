export default {
    getError(state) {
        return state.error;
    },
    getValidation(state) {
        return state.authValidate;
    },
    getSubmitMessage(state) {
        return state.submitMessage;
    }
}