export default {
    onSubmit(state, payload) {
        state.email = payload.email;
        state.employeeNumber = payload.employeeNumber;
        state.departmentName = payload.departmentName;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.submitMessage = "Account created successfully. Sign in with your credentials";
    },
    setError(state, payload) {
        state.error.authError = payload.authError;
        console.log(state.error.authError);
        state.error.errorMessage = payload.errorMessage;
    },
    setValidation(state, payload) {
        state.authValidate[payload.field] = payload.value;
    },
    setToken(state, payload) {
        console.log(state);
        console.log(payload);
    }
}