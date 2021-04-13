import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import TheDashboard from './pages/auth/TheDashboard.vue';
import ProcessDetails from './pages/form/ProcessDetails.vue';
import BenefitsSavings from './pages/form/BenefitsSavings.vue';
import FinalReview from './pages/form/FinalReview.vue';
import SignUp from './pages/auth/SignUp.vue';
import SignIn from './pages/auth/SignIn.vue';
import ProjectsList from './pages/projects/ProjectsList.vue';
import ProjectsDetail from './pages/projects/ProjectsDetail.vue';
import store from './store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { name: 'the-dashboard', path: '/dashboard', component: TheDashboard, meta: { title: 'Dashboard' } },
        { name: 'process-details', path: '/process-details', component: ProcessDetails, meta: { title: 'Process Details', keepAlive: true, form: true } },
        { name: 'benefits-savings', path: '/benefits-savings', component: BenefitsSavings, meta: { title: 'Benefits & Savings', keepAlive: true, form: true } },
        { name: 'final-review', path: '/final-review', component: FinalReview, meta: { title: 'Final Review', keepAlive: true, form: true } },
        { name: 'sign-up', path: '/sign-up', component: SignUp, meta: { title: 'Sign Up' } },
        { name: 'sign-in', path: '/sign-in', component: SignIn, meta: { title: 'Sign In' } },
        { name: 'projects-list', path: '/projects', component: ProjectsList, meta: { title: 'Projects' } },
        { name: 'projects-detail', path: '/projects/:slug', component: ProjectsDetail },
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'EmployeeDev';

    if (from.meta.form && !to.meta.form && !store.getters['projects/checkSubmit'].submitted) {
        store.dispatch("projects/initializeValues");
        store.dispatch("projects/switchSubmit", {
            message: "",
            messageType: 201,
            value: false
        })
    }
    if (from.fullPath === "/dashboard" && store.getters['projects/checkSubmit'].submitted) {
        store.dispatch("auth/resetMessages");
        store.dispatch("projects/switchSubmit", {
            message: "",
            messageType: 201,
            value: false
        })
    }
    if (from.fullPath === "/dashboard" && store.getters['auth/getSubmitMessage'] !== "") {
        store.dispatch("auth/resetMessages");
    }
    if (to.fullPath === "/sign-in" || to.fullPath === '/' || to.fullPath === "/sign-up") {
        store.dispatch("auth/resetMessages");
    }
    next();
});

export default router;