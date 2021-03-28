import { createStore } from 'vuex';

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
            errorActive: false
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
        }
    },
    actions: {
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
        onSubmit(context, payload) {
            context.commit('setError', false);
            const values = {};
            const fields = payload.fields;

            for (let term in fields) {
                let checkCondition = fields[term] && fields[term].length > 0;
                if (term === 'implementationCost' || term === 'costSavings' || term === 'timeToComplete') {
                    checkCondition = fields[term] && fields[term] > 0;
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
            if (store.getters.checkError === true) {
                console.log('All required');
            } else {
                context.commit('onSubmit', values);
            }
        },
        finalSubmit(context, payload) {
            context.commit('finalSubmit', payload);
        }
    },
    mutations: {
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
        onSubmit(state, payload) {
            console.log(state);
            console.log(payload);
        },
        finalSubmit(state, payload) {
            console.log(state);
            console.log(payload);

        }
    }
});

export default store;