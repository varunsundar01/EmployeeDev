export default {
    getError(state) {
        return state.error;
    },
    getValidation(state) {
        return state.authValidate;
    },
    getSubmitMessage(state) {
        return state.submitMessage;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    getToken(state) {
        return state.token || localStorage.getItem("token");
    }
}