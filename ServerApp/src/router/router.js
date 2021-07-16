import { createRouter, createWebHashHistory } from 'vue-router'
import LoginForm from '../components/LogInForm'
import ActionsOfEmployees from '../components/ActionsOfEmployees'

const routes = [
    {

        path: '/',
        component: LoginForm,
    },
    {
        path: '/ActionsOfEmployees',
        component: ActionsOfEmployees
    }
];

const router = createRouter({
    routes,
    history: createWebHashHistory()
});

export default router;