export default {
    getProcess(state) {
        const process = {
            projectName: "",
            problem: "",
            solution: "",
            implementation: ""
        }

        process.projectName = state.fields.projectName;
        process.problem = state.fields.problem;
        process.solution = state.fields.solution;
        process.implementation = state.fields.implementation;

        return process;
    },
    getProcessValidation(state) {
        const processValidation = {
            projectNameValidation: false,
            problemValidation: false,
            solutionValidation: false,
            implementationValidation: false
        }

        processValidation.projectNameValidation = state.fieldsValidate.projectNameValidation;
        processValidation.problemValidation = state.fieldsValidate.problemValidation;
        processValidation.solutionValidation = state.fieldsValidate.solutionValidation;
        processValidation.implementationValidation = state.fieldsValidate.implementationValidation;

        return processValidation;
    },
    getBenefits(state) {
        const benefits = {
            implementationCost: null,
            costSavings: null,
            timeToComplete: null,
            fullName: "",
            currentDate: null
        }
        benefits.implementationCost = state.fields.implementationCost;
        benefits.costSavings = state.fields.costSavings;
        benefits.timeToComplete = state.fields.timeToComplete;
        benefits.fullName = state.fields.fullName;
        benefits.currentDate = state.fields.currentDate;

        return benefits;
    },
    getBenefitsValidation(state) {
        const benefitsValidation = {
            implementationCostValidation: null,
            costSavingsValidation: null,
            timeToCompleteValidation: null,
            fullNameValidation: "",
            currentDateValidation: null
        }
        benefitsValidation.implementationCostValidation = state.fieldsValidate.implementationCostValidation;
        benefitsValidation.costSavingsValidation = state.fieldsValidate.costSavingsValidation;
        benefitsValidation.timeToCompleteValidation = state.fieldsValidate.timeToCompleteValidation;
        benefitsValidation.fullNameValidation = state.fieldsValidate.fullNameValidation;
        benefitsValidation.currentDateValidation = state.fieldsValidate.currentDateValidation;

        return benefitsValidation;
    },
    checkError(state) {
        return state.error;
    },
    checkSubmit(state) {
        return state.submitAttempt;
    },
    nameError(state) {
        return state.nameError;
    },
    getAllProjectParams(state) {
        return state.projectParams;
    },
    getProjectDetail(state) {
        return state.projectDetail;
    },
    getUserProjects(state) {
        return state.userProjects;
    },
    getDeleteParams(state) {
        return {
            showDeleteMessage: state.deleteParams.showDeleteMessage,
            deleteMessage: state.deleteParams.deleteMessage,
            deleteProjectName: state.deleteParams.deleteProjectName,
            deleteProjectId: state.deleteParams.deleteProjectId,
            deleteLoadedProjectArrayIndex: state.deleteParams.deleteLoadedProjectArrayIndex
        }
    }
}