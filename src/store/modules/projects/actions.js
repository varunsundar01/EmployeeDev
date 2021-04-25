import axios from "axios";
import createProjectsObj from "../../../hooks/projects.js";
import useTimeDifference from "../../../hooks/timeDifference.js";
import router from "../../../router.js";

export default {
    initializeValues(context) {
        context.commit("initializeValues");
    },
    setValidation(context, payload) {
        context.commit('setValidation', payload);
    },
    setError(context, payload) {
        context.commit('setError', payload);
    },
    loadProjects(context) {
        context.commit("setProjectLoader", false);
        const projects = [];

        //Get time difference between the last time projects was stored in localstorage and now
        const timeDifference = useTimeDifference(localStorage.getItem("empDev-projectsTime"));

        //Get Projects
        if (!localStorage.getItem("empDev-projects") || timeDifference >= 60) {
            axios.get(`${process.env.VUE_APP_ROOT_API}/api/projects`).then(response => {
                const data = response.data;
                for (let value in data) {
                    let projectObj = createProjectsObj(data[value]);
                    projects.push(projectObj);
                }
                context.commit("loadProjects", projects);
                localStorage.setItem("empDev-projects", JSON.stringify(projects));
                localStorage.setItem("empDev-projectsTime", new Date())
            })
        }
        context.commit("loadProjects", JSON.parse(localStorage.getItem("empDev-projects")));
    },
    loadUserProjects(context) {
        //Get time difference between the last time userProjects was stored in localstorage and now
        const timeDifference = useTimeDifference(localStorage.getItem("empDev-userProjectsTime"));

        //Get userProjects
        if (!localStorage.getItem("empDev-userProjects") || timeDifference >= 60) {
            axios.get(`${process.env.VUE_APP_ROOT_API}/api/userprojects`, {
                    headers: {
                        "Authorization": `Token ${context.rootGetters["auth/getToken"]}`
                    }
                })
                .then(response => {
                    context.commit('setUserProjects', {
                        projects: [],
                        loaded: false
                    });
                    const userProjects = [];
                    for (let key in response.data) {
                        let projectObj = createProjectsObj(response.data[key]);
                        userProjects.push(projectObj);
                    }
                    localStorage.setItem("empDev-userProjects", JSON.stringify(userProjects));
                    localStorage.setItem("empDev-userProjectsTime", new Date());

                    context.commit('setUserProjects', {
                        projects: userProjects,
                        loaded: true
                    });
                })
                .catch(() => {
                    context.commit("setError", {
                        errorActive: true,
                        errorMessage: "Could not load projects"
                    });
                })
        } else {
            context.commit("setUserProjects", {
                projects: JSON.parse(localStorage.getItem("empDev-userProjects")),
                loaded: true
            });
        }
    },
    loadProjectDetail(context, payload) {
        const projectDetail = context.getters.getAllProjectParams.allProjects.filter(project => {
            return project.project_slug === payload;
        });
        context.commit("loadProjectDetail", projectDetail[0]);
    },
    projectNameValidation(context, payload) {
        const projectNames = context.getters.getAllProjectParams.allProjectNames;

        const nameMatch = projectNames.filter(name => {
            return name.trim().toLowerCase() === payload.trim().toLowerCase();
        });
        if (nameMatch.length > 0) {
            context.commit("nameError", "This name has already been taken. Choose a different project name");
            context.dispatch("setValidation", { term: 'projectNameValidation', value: false });
        } else {
            context.commit("nameError", "");
        }
    },
    onSubmit(context, payload) {
        context.commit('setError', {
            errorActive: false,
            errorMessage: ""
        });
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
        for (let term in context.getters[payload.fieldsValidation]) {
            if (context.getters[payload.fieldsValidation][term] === false) {
                context.commit('setError', {
                    errorActive: true,
                    errorMessage: "All fields are required. Please complete the fields highlighted below"
                });
            }
        }

        if (!context.getters.checkError.errorActive) {
            context.commit("onSubmit", fields);
            localStorage.setItem(`empDev-${payload.type}`, JSON.stringify(values));
        }
    },
    switchSubmit(context, payload) {
        context.commit("finalSubmit", payload);
    },
    fullNameError(context, payload) {
        context.commit("fullNameError", payload);
    },
    currentDateError(context, payload) {
        context.commit("currentDateError", payload);
    },
    finalSubmit(context, payload) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${context.rootGetters["auth/getToken"]}`,
            },
        }
        axios
            .get(`${process.env.VUE_APP_ROOT_API}/api/auth/employee`, config)
            .then((response) => {
                const projectData = {
                    project_name: payload.projectName,
                    problem: payload.problem,
                    solution: payload.solution,
                    implementation: payload.implementation,
                    implementation_cost: payload.implementationCost,
                    cost_savings: payload.costSavings,
                    time_to_complete: payload.timeToComplete,
                    employee: `${response.data.id}`
                }
                axios.post(`${process.env.VUE_APP_ROOT_API}/api/projectpost/`, projectData, config)
                    .then(response => {
                        context.commit("finalSubmit", {
                            message: "Project proposal submitted successfully",
                            messageType: response.status,
                            value: true
                        });
                    })
            })
            .catch((error) => {
                context.commit("finalSubmit", {
                    message: `Error encountered while submitting project proposal: ${error}`,
                    messageType: error.status,
                    value: true
                });
            })
        router.push('/dashboard');
    },
    filterProjects(context, payload) {
        const filteredProjects = context.getters.getAllProjectParams.allProjects.filter(project => {
            let filterCondition = project.project_name.toLowerCase().includes(payload.value.toLowerCase())
            if (payload.type === 'select') {
                filterCondition = project.project_name.toLowerCase() === payload.value.toLowerCase();
            }
            return filterCondition;
        })
        context.commit("filterProjects", filteredProjects);
    },
    preConfirmDelete(context, payload) {
        const toDelete = context.getters.getAllProjectParams.allProjects.filter((project) => {
            return project.id === payload;
        });
        context.commit("preConfirmDelete", toDelete[0]);
    },
    confirmDeleteProject(context, payload) {
        axios
            .delete(`${process.env.VUE_APP_ROOT_API}/api/projects/${payload}`)
            .then(() => {
                context.commit("resetMessages");
                context.dispatch("auth/resetMessages", null, { root: 'true' });
                context.commit("confirmDelete", `${context.getters.getDeleteParams.deleteProjectName} was deleted`)
                context.commit("showDeleteMessage", true);

                setTimeout(() => {
                    context.commit("showDeleteMessage", false);
                    context.dispatch("resetDelete");
                }, 3000);
            })
            .catch(() => {
                context.commit("confirmDelete", "There was a problem deleting the project");
                context.dispatch("resetDelete");
            })

    },
    resetDelete(context) {
        context.commit("resetDelete");
    },
    confirmUpdate(context, payload) {
        context.commit("setUpdate", {
            updated: false,
            submitMessage: ""
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${context.rootGetters["auth/getToken"]}`,
            },
        }

        axios.get(`${process.env.VUE_APP_ROOT_API}/api/auth/employee`, config)
            .then(response => {
                const employeeId = response.data.id;
                context.commit("updateProject", payload);

                axios.put(`${process.env.VUE_APP_ROOT_API}/api/projectpost/${context.getters.getProjectDetail.id}/`, {
                        project_name: context.getters.getProjectDetail.projectName,
                        problem: context.getters.getProjectDetail.problem,
                        solution: context.getters.getProjectDetail.solution,
                        implementation: context.getters.getProjectDetail.implementation,
                        implementation_cost: context.getters.getProjectDetail.implementationCost,
                        cost_savings: context.getters.getProjectDetail.costSavings,
                        time_to_complete: context.getters.getProjectDetail.timeToComplete,
                        employee: employeeId,
                    }, config)
                    .then(() => {
                        context.commit("setUpdate", {
                            updated: true,
                            submitMessage: "Updated"
                        })

                        setTimeout(() => {
                            context.commit("setUpdate", {
                                updated: false,
                                submitMessage: ""
                            })
                        }, 3000);
                    })
            })
            .catch(() => {
                context.commit("setError", {
                    errorActive: true,
                    errorMessage: "Error while updating"
                })
            })
    }
}