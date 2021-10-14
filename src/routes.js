import LoginPage from '@/Pages/Login.vue';
import ForgotPassword from '@/Pages/ForgotPassword.vue';
import RefreshPassword from '@/Pages/RefreshPassword.vue';
import Dashboard from '@/Pages/Dashboard.vue';
import Orders from '@/Pages/Orders.vue';
import Tasks from '@/Pages/Tasks.vue';
import Processes from '@/Pages/Processes.vue';
import Storage from '@/Pages/Storage.vue';
import Clients from '@/Pages/Clients.vue';
import Employers from '@/Pages/Employers.vue';
import Settings from '@/Pages/Settings.vue';
import Finances from '@/Pages/Finances.vue';
import Profile from '@/Pages/Profile.vue';
import ElementsPage from '@/Pages/Elements.vue';

export default [
    { path: '/', component: LoginPage },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/refresh-password', component: RefreshPassword },
    { path: '/dashboard', component: Dashboard },
    { path: '/orders', component: Orders },
    { path: '/tasks', component: Tasks },
    { path: '/processes', component: Processes },
    { path: '/storage', component: Storage },
    { path: '/clients', component: Clients },
    { path: '/employers', component: Employers },
    { path: '/finances', component: Finances },
    { path: '/settings', component: Settings },
    { path: '/profile', component: Profile },
    { path: '/elements', component: ElementsPage },
];
