export default {
    onSubmit(state, payload) {
        state.email = payload.email;
        state.employeeNumber = payload.employeeNumber;
        state.departmentName = payload.departmentName;
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
    }
}