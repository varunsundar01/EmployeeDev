export default {
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
        state.projectParams.loaded = false;
        state.nameError = "";
        localStorage.removeItem('empDev-process-details');
        localStorage.removeItem('empDev-benefits-savings');
    },
    setProjectLoader(state, payload) {
        state.projectParams.loaded = payload;
    },
    loadProjects(state, payload) {
        if (payload !== null) {
            state.projectParams.allProjects = payload;
            state.projectParams.filteredProjects = payload;
            state.projectParams.allProjectNames = [];
            state.projectParams.filteredProjectNames = [];
            for (let index in state.projectParams.allProjects) {
                state.projectParams.allProjectNames.push(state.projectParams.allProjects[index].project_name);
                state.projectParams.filteredProjectNames.push(state.projectParams.allProjects[index].project_name);
            }
            state.projectParams.loaded = true;
        }
    },
    loadProjectDetail(state, payload) {
        state.projectDetail.id = payload.id;
        state.projectDetail.projectName = payload.project_name;
        state.projectDetail.createdAt = payload.createdAt;
        state.projectDetail.implementationCost = payload.implementation_cost;
        state.projectDetail.costSavings = payload.cost_savings;
        state.projectDetail.timeToComplete = payload.time_to_complete;
        state.projectDetail.problem = payload.problem;
        state.projectDetail.solution = payload.solution;
        state.projectDetail.implementation = payload.implementation;
        state.projectDetail.employee = payload.employee;
        state.projectDetail.projectEmployeeId = parseInt(payload.project_employee_id);
    },
    updateProject(state, payload) {
        state.projectDetail[payload.id] = payload.value;
        localStorage.removeItem("empDev-projects");
        localStorage.removeItem("empDev-userProjects");
    },
    setProjectNames(state, payload) {
        state.projectParams.allProjectNames = payload;
    },
    setUserProjects(state, payload) {
        state.userProjects.projects = payload.projects;
        state.userProjects.loaded = payload.loaded;
    },
    setValidation(state, payload) {
        const term = payload.term;
        state.fieldsValidate[term] = payload.value;
    },
    setError(state, payload) {
        state.error.errorActive = payload.errorActive;
        state.error.errorMessage = payload.errorMessage;
    },
    fullNameError(state, payload) {
        state.fullNameError = payload;
    },
    currentDateError(state, payload) {
        state.currentDateError = payload;
    },
    setUpdate(state, payload) {
        state.submitAttempt.updated = payload.updated;
        state.submitAttempt.submitMessage = payload.submitMessage;
    },
    nameError(state, payload) {
        state.nameError = payload;
    },
    onSubmit(state, payload) {
        for (let field in payload) {
            state.fields[field] = payload[field]
        }
    },
    finalSubmit(state, payload) {
        state.submitAttempt.submitMessage = payload.message;
        state.submitAttempt.submitted = payload.value;
        if (payload.messageType >= 400 || payload.messageType === undefined) {
            state.errorActive = true;
        } else {
            state.errorActive = false;
        }
        localStorage.removeItem("empDev-projects");
        localStorage.removeItem("empDev-userProjects");
    },
    filterProjects(state, payload) {
        const filteredProjects = [];
        const filteredProjectNames = [];

        for (let index in payload) {
            filteredProjects.push(payload[index]);
            filteredProjectNames.push(payload[index].project_name);
        }
        state.projectParams.filteredProjects = filteredProjects;
        state.projectParams.filteredProjectNames = filteredProjectNames;
    },
    preConfirmDelete(state, payload) {
        state.deleteParams.deleteProjectId = payload.id;
        state.deleteParams.deleteLoadedProjectArrayIndex = state.projectParams.allProjects.indexOf(payload);
        state.deleteParams.deleteProjectName = payload.project_name;
        state.deleteParams.deleteFilteredProjectArrayIndex = state.projectParams.filteredProjects.indexOf(payload);
    },
    confirmDelete(state, payload) {
        state.deleteParams.deleteMessage = payload;
        state.projectParams.filteredProjects.splice(state.deleteParams.deleteFilteredProjectArrayIndex, 1);
        state.userProjects.projects.splice(state.deleteParams.deleteFilteredProjectArrayIndex, 1);
        state.projectParams.allProjectNames.splice(state.deleteParams.deleteLoadedProjectArrayIndex, 1);
        state.projectParams.filteredProjectNames.splice(state.deleteParams.deleteFilteredProjectArrayIndex, 1);
        localStorage.removeItem("empDev-projects");
        localStorage.removeItem("empDev-userProjects");
    },
    showDeleteMessage(state, payload) {
        state.deleteParams.showDeleteMessage = payload;
    },
    resetDelete(state) {
        state.deleteParams.showDeleteMessage = false;
        state.deleteParams.deleteProjectName = "";
        state.deleteParams.deleteProjectId = null;
        state.deleteParams.deleteLoadedProjectArrayIndex = null;
        state.deleteParams.deleteMessage = "";
    },
    resetMessages(state) {
        state.errorActive = false;
        state.errorMessage = "";
        state.submitAttempt.submitMessage = "";
        state.submitAttempt.submitted = false;
        state.submitAttempt.updated = false;
    }
}