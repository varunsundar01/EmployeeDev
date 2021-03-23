import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import ProcessDetails from './pages/ProcessDetails.vue';
import BenefitsSavings from './pages/BenefitsSavings.vue';
import FinalReview from './pages/FinalReview.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: HomePage },
        { name: 'process-details', path: '/process-details', component: ProcessDetails },
        { name: 'benefits-savings', path: '/benefits-savings', component: BenefitsSavings },
        { name: 'final-review', path: '/final-review', component: FinalReview },
    ]
});

export default router;