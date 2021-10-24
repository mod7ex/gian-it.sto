import LoginPage from '@/Pages/Login.vue';
import ForgotPassword from '@/Pages/ForgotPassword.vue';
import RefreshPassword from '@/Pages/RefreshPassword.vue';
import Dashboard from '@/Pages/Dashboard.vue';
import Orders from '@/Pages/Orders.vue';
import OrderForm from '@/Pages/OrderForm.vue';
import Tasks from '@/Pages/Tasks.vue';
import Task from '@/Pages/Task.vue';
import TaskForm from '@/Pages/TaskForm.vue';
import Processes from '@/Pages/Processes.vue';
import ProcessesForm from '@/Pages/ProcessesForm.vue';
import Process from '@/Pages/Process.vue';
import ProcessForm from '@/Pages/ProcessForm.vue';
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
    { path: '/orders/create', component: OrderForm },

    { path: '/tasks', component: Tasks },
    { path: '/tasks/1', component: Task },
    { path: '/tasks/1/edit', component: TaskForm },
    { path: '/tasks/create', component: TaskForm },

    { path: '/processes', component: Processes },
    { path: '/processes/create', component: ProcessesForm },
    { path: '/processes/1', component: Process },
    { path: '/processes/1/create', component: ProcessForm },

    { path: '/storage', component: Storage },
    { path: '/clients', component: Clients },
    { path: '/employers', component: Employers },
    { path: '/finances', component: Finances },
    { path: '/settings', component: Settings },
    { path: '/profile', component: Profile },
    { path: '/elements', component: ElementsPage },
];
