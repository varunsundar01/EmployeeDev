import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            email: '',
            employeeNumber: null,
            departmentName: null,
            firstName: '',
            lastName: '',
            token: null,
        }
    },
    mutations,
    actions,
    getters
}