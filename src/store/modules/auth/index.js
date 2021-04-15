import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            email: "",
            employeeNumber: "",
            departmentName: "",
            firstName: "",
            lastName: "",
            token: null,
            error: {
                authError: false,
                errorMessage: ""
            },
            authValidate: {
                departmentNameValidate: false,
                firstNameValidate: false,
                lastNameValidate: false,
                emailValidate: false,
                employeeNumberValidate: false,
                passwordValidate: false,
                password2Validate: false
            },
            submitMessage: ""
        }
    },
    mutations,
    actions,
    getters
}