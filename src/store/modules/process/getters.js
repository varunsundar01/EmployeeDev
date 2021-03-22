export default {
    getProcess(state) {
        return state.process;
    },
    getProcessValidation(state) {
        return state.processValidate;
    },
    checkError(state) {
        return state.errorActive;
    }
}