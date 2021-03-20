import { createRouter, createWebHistory } from 'vue-router';

import ProcessDetails from './pages/ProcessDetails.vue';
import BenefitsSavings from './pages/BenefitsSavings.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'process-details', path: '/process-details', component: ProcessDetails },
        { name: 'benefits-savings', path: '/benefits-savings', component: BenefitsSavings }
    ]
});

export default router;