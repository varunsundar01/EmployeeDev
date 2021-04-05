import { createStore } from 'vuex';
import axios from 'axios';
import useProjectsData from '../hooks/useProjectsData.js';

import authModule from './modules/auth/index.js';

const store = createStore({
    modules: {
        auth: authModule,
    },
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
            allProjectNames: [],
            nameError: ""
        }
    },
    getters: {
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
            return state.errorActive;
        },
        checkSubmit(state) {
            return state.submitAttempt;
        },
        nameError(state) {
            return state.nameError;
        }
    },
    actions: {
        initializeValues(context) {
            context.commit("initializeValues");
        },
        enteredInput(context, payload) {
            Object.keys(context.state.fields).find((key) => {
                if (key === payload.id) {
                    context.commit('enteredInput', payload);
                }
            });
        },
        setValidation(context, payload) {
            context.commit('setValidation', payload);
        },
        projectNameValidation(context, payload) {
            context.rootState.allProjectNames = [];
            useProjectsData().then(values => {
                for (let value in values) {
                    context.rootState.allProjectNames.push(values[value].project_name);
                }
                const nameMatch = context.rootState.allProjectNames.filter(name => {
                    return name.toLowerCase() === payload.toLowerCase();
                });
                if (nameMatch.length > 0) {
                    context.commit("nameError", "This name has already been taken. Choose a different project name");
                    context.dispatch("setValidation", { term: 'projectNameValidation', value: false });
                    return true;
                }
                context.commit("nameError", "");
                return false;
            });
        },
        onSubmit(context, payload) {
            context.commit('setError', false);
            const values = {};
            const fields = payload.fields;

            for (let term in fields) {
                let checkCondition = fields[term] && fields[term].length > 0;
                if (term === 'implementationCost' || term === 'costSavings' || term === 'timeToComplete') {
                    checkCondition = fields[term] && fields[term] >= 0;
                }

                if (checkCondition) {
                    context.dispatch('setValidation', { term: term + 'Validation', value: true });
                    values[term] = fields[term].trim();
                }
            }
            for (let term in store.getters[payload.fieldsValidation]) {
                if (store.getters[payload.fieldsValidation][term] === false) {
                    context.commit('setError', true);
                }
            }
            if (!store.getters.checkError) {
                localStorage.setItem(payload.type, JSON.stringify(values));
            }
        },
        switchSubmit(context, payload) {
            context.commit("finalSubmit", payload);
        },
        async finalSubmit(context, payload) {
            const projectData = {
                project_name: payload.projectName,
                problem: payload.problem,
                solution: payload.solution,
                implementation: payload.implementation,
                implementation_cost: payload.implementationCost,
                cost_savings: payload.costSavings,
                time_to_complete: payload.timeToComplete
            }
            axios.post("http://127.0.0.1:8000/api/projects/", projectData)
                .then(response => {
                    context.commit("finalSubmit", {
                        message: "Project proposal submitted successfully",
                        messageType: response.status,
                        value: true
                    });
                })
                .catch((error) => {
                    context.commit("finalSubmit", {
                        message: `Error encountered while submitting project proposal: ${error}`,
                        messageType: error.status,
                        value: true
                    })
                })
        }
    },
    mutations: {
        initializeValues(state) {
            state.fields = {
                projectName: "",
                problem: "",
                solution: "",
                implementation: "",
                implementationCost: null,
                costSavings: null,
                timeToComplete: null,
                fullName: "",
                currentDate: null
            };
            state.fieldsValidate = {
                projectNameValidation: false,
                problemValidation: false,
                solutionValidation: false,
                implementationValidation: false,
                implementationCostValidation: false,
                costSavingsValidation: false,
                timeToCompleteValidation: false,
                fullNameValidation: false,
                currentDateValidation: false
            };
            state.allProjectNames = [];
            state.nameError = "";
            localStorage.removeItem('process-details');
            localStorage.removeItem('benefits-savings');
        },
        enteredInput(state, payload) {
            state.fields[payload.id] = payload.value;
        },
        setValidation(state, payload) {
            const term = payload.term;
            state.fieldsValidate[term] = payload.value;
        },
        setError(state, payload) {
            state.errorActive = payload;
        },
        nameError(state, payload) {
            state.nameError = payload;
        },
        finalSubmit(state, payload) {
            state.submitAttempt.submitMessage = payload.message;
            state.submitAttempt.submitted = payload.value;
            if (payload.messageType >= 400 || payload.messageType === undefined) {
                state.errorActive = true;
            } else {
                state.errorActive = false;
            }
            this.commit("initializeValues");
            localStorage.removeItem('projects');
            localStorage.removeItem('process-details');
            localStorage.removeItem('benefits-savings');
        }
    }
});

export default store;