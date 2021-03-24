export default {
    enteredInput(state, payload) {
        state.process[payload.id] = payload.value;
    },
    setProjectNameValidation(state, payload) {
        state.processValidate['projectNameValidate'] = payload; //payload = true or false
    },
    setProblemValidation(state, payload) {
        state.processValidate['problemValidate'] = payload; //payload = true or false
    },
    setSolutionValidation(state, payload) {
        state.processValidate['solutionValidate'] = payload; //payload = true or false
    },
    setImplementationValidation(state, payload) {
        state.processValidate['implementationValidate'] = payload; //payload = true or false
    },
    submittedProcess(state, payload) {
        state.process = payload;
        state.errorActive = false;
    },
    setError(state) {
        state.errorActive = true;
    }
}