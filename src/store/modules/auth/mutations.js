export default {
    onSubmit(state, payload) {
        state.email = payload.email;
        state.employeeNumber = payload.employeeNumber;
        state.departmentName = payload.departmentName;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.submitMessage = "Account verification email was sent. Follow the instructions in the email to verify your account and sign in";
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
        localStorage.setItem("empDev-token", payload);
    },
    setEmpId(state, payload) {
        state.empId = payload;
        localStorage.setItem("empDev-empId", payload);
    },
    setSubmitMessage(state, payload) {
        state.submitMessage = payload;
    },
    signIn(state, payload) {
        for (let term in payload) {
            state[term] = payload[term];
        }
        localStorage.setItem('empDev-firstName', payload.firstName);
        state.submitMessage = "Login Successful";
    },
    logout(state) {
        state.token = null;
        localStorage.removeItem("empDev-token");
        localStorage.removeItem("empDev-empId");
        localStorage.removeItem("empDev-firstName");
        localStorage.removeItem("empDev-userProjects");
        localStorage.removeItem("empDev-userProjectsTime");
        localStorage.removeItem("empDev-projects");
        localStorage.removeItem("empDev-projectsTime");
    },
    resetMessages(state) {
        state.submitMessage = "";
        state.error.authError = false;
        state.error.errorMessage = "";
    }
}