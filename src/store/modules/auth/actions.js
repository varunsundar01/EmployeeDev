import axios from "axios";
import router from "../../../router.js";

export default {
    setError(context, payload) {
        context.commit("setError", payload);
    },
    setValidation(context, payload) {
        context.commit("setValidation", payload);
    },
    registerUser(context, payload) {
        for (let field in payload) {
            if (field !== "email" || field !== "employeeNumber") {
                if (payload[field].trim() === "") {
                    context.commit('setError', {
                        authError: true,
                        errorMessage: "All fields are required"
                    });

                    context.commit("setValidation", {
                        field: `${field}Validate`,
                        value: false
                    });
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }
            }
        }

        if (!context.getters.getError.authError) {
            axios.post(`${process.env.VUE_APP_ROOT_API}/api/auth/register`, {
                    "email": payload.email,
                    "password": payload.password,
                    "first_name": payload.firstName,
                    "last_name": payload.lastName,
                    "employee_number": payload.employeeNumber,
                    "department_name": payload.departmentName
                }, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(() => {
                    axios.post(`${process.env.VUE_APP_ROOT_API}/api/auth/send-account-verification`, {
                            "email": payload.email
                        })
                        .then(() => {
                            router.push('./sign-in');
                        })
                })
                .catch(error => {
                    console.log(error.response.data);
                    if ('email' in error.response.data && 'employee_number' in error.response.data) {
                        context.commit('setError', {
                            authError: true,
                            errorMessage: "Employee already exists. Sign in with your credentials"
                        });
                        context.commit('setValidation', {
                            field: 'emailValidate',
                            value: true
                        });
                        context.commit('setValidation', {
                            field: 'employeeNumberValidate',
                            value: true
                        });
                    } else if ("email" in error.response.data) {
                        context.commit('setError', {
                            authError: true,
                            errorMessage: "Employee with email already exists. Sign in with your credentials"
                        });
                        context.commit('setValidation', {
                            field: 'emailValidate',
                            value: true
                        });
                    } else if ("employee_number" in error.response.data) {
                        context.commit('setError', {
                            authError: true,
                            errorMessage: "Employee with employee number already exists. Sign in with your credentials"
                        });
                        context.commit('setValidation', {
                            field: 'employeeNumberValidate',
                            value: true
                        });
                    }
                })
            context.commit("onSubmit", payload);
        }
    },
    verifyUser(context, payload) {
        axios.patch(`${process.env.VUE_APP_ROOT_API}/api/auth/activate-employee`, {
                "uidb64": payload.uidb64,
                "token": payload.token
            })
            .then(() => {
                context.commit("setSubmitMessage", "Account verified successfully. Sign in with your credentials");
                router.push('/sign-in');
            })
    },
    signIn(context, payload) {
        //Reset messages before login
        context.commit("resetMessages");

        axios.post(`${process.env.VUE_APP_ROOT_API}/api/auth/login`, payload)
            .then(response => {
                context.commit('setToken', response.data.token);
                const employee = response.data.employee;
                context.commit('setEmpId', employee.id);
                context.commit("signIn", {
                    departmentName: employee.department_name,
                    email: employee.email,
                    employeeNumber: employee.employee_number,
                    firstName: employee.first_name,
                    lastName: employee.last_name,
                });
                router.push('./dashboard');
            })
            .catch(error => {
                if ('verification-error' in error.response.data) {
                    context.commit('setError', {
                        authError: true,
                        errorMessage: error.response.data['verification-error'][0]
                    })
                } else if ("email" in error.response.data || error.response.data.non_field_errors[0] === "Incorrect Credentials") {
                    context.commit("setError", {
                        authError: true,
                        errorMessage: "Invalid login. Please check your email and password"
                    })
                }
            })
    },
    tryLogin(context) {
        if (localStorage.getItem("token") !== null) {
            context.commit("setToken", localStorage.getItem("token"));
            context.commit("setEmpId", JSON.parse(localStorage.getItem("empId")));
        }
    },
    logout(context) {
        axios.post(`${process.env.VUE_APP_ROOT_API}/api/auth/logout`, null, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${context.getters.getToken}`
                }
            })
            .then(() => {
                context.commit('logout');
                context.commit("resetMessages");
                context.dispatch("projects/setError", {
                    errorActive: false,
                    errorMessage: ""
                }, { root: 'true' })
                router.push('/');
            })
            .catch(() => {
                context.commit("setError", {
                    authError: true,
                    errorMessage: "There was a problem while logging out"
                });
            })
    },
    requestPasswordReset(_, payload) {
        axios.post(`${process.env.VUE_APP_ROOT_API}/api/auth/request-reset-password`, {
            "email": payload
        })
    },
    confirmPasswordReset(context, payload) {
        axios.patch(`${process.env.VUE_APP_ROOT_API}/api/auth/password-reset-complete`, {
                "uidb64": payload.uidb64,
                "token": payload.token,
                "password": payload.password
            })
            .then(() => {
                context.commit("setSubmitMessage", "Password was reset successfully. Login with you new credentials")
                router.push("/sign-in");
            })
            .catch(error => {
                context.commit("setError", {
                    authError: true,
                    errorMessage: error.response.data.detail
                })
            })
    },
    resetMessages(context) {
        context.commit("resetMessages");
    }
}