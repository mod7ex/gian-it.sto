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
import Storages from '@/Pages/Storages.vue';
import StoragesForm from '@/Pages/StoragesForm.vue';
import StorageForm from '@/Pages/StorageForm.vue';
import Clients from '@/Pages/Clients.vue';
import ClientForm from '@/Pages/ClientForm.vue';
import Employers from '@/Pages/Employers.vue';
import EmployerForm from '@/Pages/EmployerForm.vue';
import Settings from '@/Pages/Settings.vue';
import Finances from '@/Pages/Finances.vue';
import FinanceForm from '@/Pages/FinanceForm.vue';
import FinanceGroup from '@/Pages/FinanceGroup.vue';
import FinanceGroupForm from '@/Pages/FinanceGroupForm.vue';
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
import Why from '@/Pages/Why.vue';
import WhyForm from '@/Pages/WhyForm.vue';
import Developers from '@/Pages/Developers.vue';
import DeveloperForm from '@/Pages/DeveloperForm.vue';
import Pipelines from '@/Pages/Pipelines.vue';
import PipelineForm from '@/Pages/PipelineForm.vue';
import DiagnosticCard from '@/Pages/DiagnosticCard.vue';
import DiagnosticCardForm from '@/Pages/DiagnosticCardForm.vue';
import Roles from '@/Pages/Roles.vue';
import RoleForm from '@/Pages/RoleForm.vue';

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

    { path: '/storages', component: Storages },
    { path: '/storages/create', component: StoragesForm },
    { path: '/storages/1', component: Storage },
    { path: '/storages/1/create', component: StorageForm },

    { path: '/clients', component: Clients },
    { path: '/clients/create', component: ClientForm },

    { path: '/employers', component: Employers },
    { path: '/employers/create', component: EmployerForm },
    { path: '/roles', component: Roles },
    { path: '/roles/create', component: RoleForm },

    { path: '/departments', component: Departments },
    { path: '/departments/create', component: DepartmentForm },

    { path: '/developers', component: Developers },
    { path: '/developers/create', component: DeveloperForm },

    { path: '/cars', component: Cars },
    { path: '/cars/create', component: CarForm },
    { path: '/car-marks', component: CarMarks },
    { path: '/car-marks/create', component: CarMarksForm },
    { path: '/car-models', component: CarModels },
    { path: '/car-models/create', component: CarModelsForm },

    { path: '/why', component: Why },
    { path: '/why/create', component: WhyForm },

    { path: '/finances', component: Finances },
    { path: '/finances/create', component: FinanceForm },
    { path: '/finances-groups', component: FinanceGroup },
    { path: '/finances-groups/create', component: FinanceGroupForm },

    { path: '/settings', component: Settings },

    { path: '/pipelines', component: Pipelines },
    { path: '/pipelines/create', component: PipelineForm },

    { path: '/diagnostic-card', component: DiagnosticCard },
    { path: '/diagnostic-card/create', component: DiagnosticCardForm },

    { path: '/profile', component: Profile },

    { path: '/elements', component: ElementsPage },
];
