import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            fields: {
                projectName: "",
                problem: "",
                solution: "",
                implementation: "",
                implementationCost: null,
                costSavings: null,
                timeToComplete: null,
                fullName: "",
                currentDate: null
            },
            fieldsValidate: {
                projectNameValidation: false,
                problemValidation: false,
                solutionValidation: false,
                implementationValidation: false,
                implementationCostValidation: false,
                costSavingsValidation: false,
                timeToCompleteValidation: false,
                fullNameValidation: false,
                currentDateValidation: false
            },
            errorActive: false,
            submitAttempt: {
                submitted: false,
                submitMessage: ""
            },
            nameError: "",
            deleteParams: {
                deleteProjectName: "",
                deleteProjectId: null,
                deleteLoadedProjectArrayIndex: null,
                deleteFilteredProjectArrayIndex: null,
                deleteMessage: "",
                showDeleteMessage: false
            },
            projectParams: {
                allProjects: [],
                allProjectNames: [],
                filteredProjects: [],
                filteredProjectNames: [],
                loaded: false
            },
            projectDetail: {
                projectName: "",
                createdAt: null,
                implementationCost: null,
                costSavings: null,
                timeToComplete: null,
                problem: "",
                solution: "",
                implementation: ""
            }
        }
    },
    getters,
    actions,
    mutations
}