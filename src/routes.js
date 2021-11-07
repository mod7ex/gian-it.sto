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
import ClientForm from '@/Pages/ClientForm.vue';
import Employers from '@/Pages/Employers.vue';
import EmployerForm from '@/Pages/EmployerForm.vue';
import Settings from '@/Pages/Settings.vue';
import Finances from '@/Pages/Finances.vue';
import Profile from '@/Pages/Profile.vue';
import ElementsPage from '@/Pages/Elements.vue';
import Departments from '@/Pages/Departments.vue';
import DepartmentForm from '@/Pages/DepartmentForm.vue';
import Cars from '@/Pages/Cars.vue';
import CarForm from '@/Pages/CarForm.vue';
import CarMarks from '@/Pages/CarMarks.vue';
import CarMarksForm from '@/Pages/CarMarksForm.vue';
import CarModels from '@/Pages/CarModels.vue';
import CarModelsForm from '@/Pages/CarModelsForm.vue';

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
    { path: '/clients/create', component: ClientForm },

    { path: '/employers', component: Employers },
    { path: '/employers/create', component: EmployerForm },

    { path: '/departments', component: Departments },
    { path: '/departments/create', component: DepartmentForm },

    { path: '/cars', component: Cars },
    { path: '/cars/create', component: CarForm },
    { path: '/car-marks', component: CarMarks },
    { path: '/car-marks/create', component: CarMarksForm },
    { path: '/car-models', component: CarModels },
    { path: '/car-models/create', component: CarModelsForm },

    { path: '/finances', component: Finances },

    { path: '/settings', component: Settings },

    { path: '/profile', component: Profile },

    { path: '/elements', component: ElementsPage },
];
