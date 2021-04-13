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
        state.error.errorMessage = payload.errorMessage;
    },
    setValidation(state, payload) {
        state.authValidate[payload.field] = payload.value;
    },
    setToken(state, payload) {
        state.token = payload;
        localStorage.setItem("token", payload);
    },
    signIn(state, payload) {
        for (let term in payload) {
            state[term] = payload[term];
        }
        state.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', true);
        state.submitMessage = "Login Successful";
    },
    logout(state) {
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
    },
    resetMessages(state) {
        state.submitMessage = "";
        state.error.authError = false;
        state.error.errorMessage = "";
    }
}