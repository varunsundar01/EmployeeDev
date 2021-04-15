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
        localStorage.setItem('firstName', payload.firstName);
        state.submitMessage = "Login Successful";
    },
    logout(state) {
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("firstName");
        localStorage.removeItem("userProjects");
        localStorage.removeItem("projects");
    },
    resetMessages(state) {
        state.submitMessage = "";
        state.error.authError = false;
        state.error.errorMessage = "";
    }
}