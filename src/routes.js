import LoginPage from './components/Pages/Login.vue';
import ForgotPassword from './components/Pages/ForgotPassword.vue';
import RefreshPassword from './components/Pages/RefreshPassword.vue';
import Dashboard from './components/Pages/Dashboard.vue';
import ElementsPage from './components/Pages/Elements.vue';

export default [
    { path: '/', component: LoginPage },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/refresh-password', component: RefreshPassword },
    { path: '/dashboard', component: Dashboard },
    { path: '/elements', component: ElementsPage },
];
