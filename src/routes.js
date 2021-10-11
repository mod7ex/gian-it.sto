import LoginPage from './components/Pages/Login.vue';
import Dashboard from './components/Pages/Dashboard.vue';
import ElementsPage from './components/Pages/Elements.vue';

export default [
    { path: '/', component: LoginPage },
    { path: '/dashboard', component: Dashboard },
    { path: '/elements', component: ElementsPage },
];
