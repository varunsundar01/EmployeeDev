import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            process: {
                problem: "",
                solution: "",
                implementation: ""
            },
            processValidate: {
                problemValidate: false,
                solutionValidate: false,
                implementationValidate: false
            },
            errorActive: false,
        };
    },
    mutations,
    actions,
    getters
}