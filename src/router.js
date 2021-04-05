import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import TheDashboard from './pages/auth/TheDashboard.vue';
import ProcessDetails from './pages/form/ProcessDetails.vue';
import BenefitsSavings from './pages/form/BenefitsSavings.vue';
import FinalReview from './pages/form/FinalReview.vue';
import SignUp from './pages/auth/SignUp.vue';
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
        { name: 'projects-list', path: '/projects', component: ProjectsList, meta: { title: 'Projects' } },
        { name: 'projects-detail', path: '/projects/:slug', component: ProjectsDetail },
    ]
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'EmployeeDev';

    if (from.meta.form && !to.meta.form) {
        store.dispatch("initializeValues");
    }
    if (from.fullPath === "/dashboard" && store.getters.checkSubmit.submitted) {
        store.dispatch("switchSubmit", {
            message: "",
            messageType: 201,
            value: false
        })
    }
    next();
});

export default router;