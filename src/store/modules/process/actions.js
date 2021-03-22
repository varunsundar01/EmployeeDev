export default {
    enteredInput(context, payload) {
        Object.keys(context.state.process).find((key) => {
            if (key === payload.id) {
                context.commit('enteredInput', payload);
            }
        });
    },
    setProblemValidation(context, payload) {
        context.commit('setProblemValidation', payload);
    },
    setSolutionValidation(context, payload) {
        context.commit('setSolutionValidation', payload);
    },
    setImplementationValidation(context, payload) {
        context.commit('setImplementationValidation', payload);
    },
    onSubmit({ commit, getters }) {
        const process = {
            problem: '',
            solution: '',
            implementation: ''
        };

        if (getters.getProcess.problem && getters.getProcess.problem.trim().length > 0) {
            commit('setProblemValidation', true);
            process['problem'] = getters.getProcess.problem.trim();
        }
        if (getters.getProcess.solution && getters.getProcess.solution.trim().length > 0) {
            commit('setSolutionValidation', true);
            process['solution'] = getters.getProcess.solution.trim();
        }
        if (getters.getProcess.implementation && getters.getProcess.implementation.trim().length > 0) {
            commit('setImplementationValidation', true);
            process['implementation'] = getters.getProcess.implementation.trim();
        }

        if (getters.getProcessValidation.problemValidate === true && getters.getProcessValidation.solutionValidate === true && getters.getProcessValidation.implementationValidate === true) {
            commit('submittedProcess', process);
        } else {
            commit('setError');
        }
    }
}