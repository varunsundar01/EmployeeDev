import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import TheDashboard from './pages/auth/TheDashboard.vue';
import ProcessDetails from './pages/form/ProcessDetails.vue';
import BenefitsSavings from './pages/form/BenefitsSavings.vue';
import FinalReview from './pages/form/FinalReview.vue';
import SignUp from './pages/auth/SignUp.vue';
import VerifyAccount from './pages/auth/VerifyAccount.vue';
import SignIn from './pages/auth/SignIn.vue';
import ForgotPassword from './pages/auth/ForgotPassword.vue';
import ForgotPasswordConfirm from './pages/auth/ForgotPasswordConfirm.vue';
import ProjectsList from './pages/projects/ProjectsList.vue';
import ProjectsDetail from './pages/projects/ProjectsDetail.vue';
import NotFound from './pages/NotFound.vue';
import store from './store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { name: 'the-dashboard', path: '/dashboard', component: TheDashboard, meta: { title: 'Dashboard', requiresAuth: true } },
        { name: 'process-details', path: '/process-details', component: ProcessDetails, meta: { title: 'Process Details', keepAlive: true, form: true, requiresAuth: true } },
        { name: 'benefits-savings', path: '/benefits-savings', component: BenefitsSavings, meta: { title: 'Benefits & Savings', keepAlive: true, form: true, requiresAuth: true } },
        { name: 'final-review', path: '/final-review', component: FinalReview, meta: { title: 'Final Review', keepAlive: true, form: true, requiresAuth: true } },
        { name: 'sign-up', path: '/sign-up', component: SignUp, meta: { title: 'Sign Up', noAuth: true } },
        { name: 'verify-account', path: '/verify-account', component: VerifyAccount, meta: { title: 'Verify Your Account', noAuth: true } },
        { name: 'sign-in', path: '/sign-in', component: SignIn, meta: { title: 'Sign In', noAuth: true } },
        { name: 'forgot-password', path: '/forgot-password', component: ForgotPassword, meta: { title: 'Forgot Password', noAuth: true } },
        { name: 'forgot-password-confirm', path: '/forgot-password-confirm', component: ForgotPasswordConfirm, meta: { title: 'Forgot Password Confirm', forgotPasswordConfirm: true } },
        { name: 'projects-list', path: '/projects', component: ProjectsList, meta: { title: 'Projects' } },
        { name: 'projects-detail', path: '/projects/:slug', component: ProjectsDetail },
        { path: '/:notFound(.*)', component: NotFound },
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'EmployeeDev';

    if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
        next("/sign-in");
    } else if (to.meta.noAuth && store.getters["auth/isAuthenticated"]) {
        next("/dashboard");
    } else if (from.meta.form && !to.meta.form && !store.getters['projects/checkSubmit'].submitted) {
        store.dispatch("projects/initializeValues");
        store.dispatch("projects/switchSubmit", {
            message: "",
            messageType: 201,
            value: false
        })
        next();
    } else if (from.fullPath === "/dashboard" && store.getters['projects/checkSubmit'].submitted) {
        store.dispatch("auth/resetMessages");
        store.dispatch("projects/switchSubmit", {
            message: "",
            messageType: 201,
            value: false
        })
        next();
    } else if (to.fullPath === "/sign-in" || to.fullPath === '/') {
        store.dispatch("auth/setError", {
            authError: false,
            errorMessage: ""
        });
        next();
    } else if (from.fullPath === "/dashboard" && store.getters['auth/getSubmitMessage'] !== "") {
        store.dispatch("auth/resetMessages");
        next();
    } else {
        next();
    }
});

export default router;