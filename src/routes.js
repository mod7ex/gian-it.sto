import LoginPage from '@/Pages/Login/Login.vue';
import ForgotPassword from '@/Pages/Login/ForgotPassword.vue';
import RefreshPassword from '@/Pages/Login/RefreshPassword.vue';
import Dashboard from '@/Pages/Office/Dashboard.vue';
import Orders from '@/Pages/Office/Orders.vue';
import OrderForm from '@/Pages/Office/OrderForm.vue';
import Tasks from '@/Pages/Office/Tasks.vue';
import Task from '@/Pages/Office/Task.vue';
import TaskForm from '@/Pages/Office/TaskForm.vue';
import Processes from '@/Pages/Office/Processes.vue';
import ProcessesForm from '@/Pages/Office/ProcessesForm.vue';
import Process from '@/Pages/Office/Process.vue';
import ProcessForm from '@/Pages/Office/ProcessForm.vue';
import Storage from '@/Pages/Office/Storage.vue';
import Storages from '@/Pages/Office/Storages.vue';
import StoragesForm from '@/Pages/Office/StoragesForm.vue';
import StorageForm from '@/Pages/Office/StorageForm.vue';
import Clients from '@/Pages/Office/Clients.vue';
import ClientForm from '@/Pages/Office/ClientForm.vue';
import Employers from '@/Pages/Office/Employers.vue';
import EmployerForm from '@/Pages/Office/EmployerForm.vue';
import Settings from '@/Pages/Office/Settings.vue';
import Finances from '@/Pages/Office/Finances.vue';
import FinanceForm from '@/Pages/Office/FinanceForm.vue';
import FinanceGroup from '@/Pages/Office/FinanceGroup.vue';
import FinanceGroupForm from '@/Pages/Office/FinanceGroupForm.vue';
import Profile from '@/Pages/Office/Profile.vue';
import ElementsPage from '@/Pages/Office/Elements.vue';
import Departments from '@/Pages/Office/Departments.vue';
import DepartmentForm from '@/Pages/Office/DepartmentForm.vue';
import Cars from '@/Pages/Office/Cars.vue';
import CarForm from '@/Pages/Office/CarForm.vue';
import CarMarks from '@/Pages/Office/CarMarks.vue';
import CarMarksForm from '@/Pages/Office/CarMarksForm.vue';
import CarModels from '@/Pages/Office/CarModels.vue';
import CarModelsForm from '@/Pages/Office/CarModelsForm.vue';
import Why from '@/Pages/Office/Why.vue';
import WhyForm from '@/Pages/Office/WhyForm.vue';
import Developers from '@/Pages/Office/Developers.vue';
import DeveloperForm from '@/Pages/Office/DeveloperForm.vue';
import Pipelines from '@/Pages/Office/Pipelines.vue';
import PipelineForm from '@/Pages/Office/PipelineForm.vue';
import DiagnosticCard from '@/Pages/Office/DiagnosticCard.vue';
import DiagnosticCardForm from '@/Pages/Office/DiagnosticCardForm.vue';
import Roles from '@/Pages/Office/Roles.vue';
import RoleForm from '@/Pages/Office/RoleForm.vue';
import WorkerTasks from '@/Pages/Work/Tasks.vue';
import WorkerTask from '@/Pages/Work/Task.vue';
import WorkerProfile from '@/Pages/Work/Profile.vue';
import WorkerTimes from '@/Pages/Work/Times.vue';
import ChangeWorker from '@/Pages/Work/ChangeWorker.vue';

export default [
  { path: '/', component: LoginPage, meta: { guest: true } },
  { path: '/forgot-password', component: ForgotPassword, meta: { guest: true } },
  { path: '/refresh-password/:token', component: RefreshPassword, meta: { guest: true } },

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
  { path: '/employers/update/:id', component: EmployerForm, name: 'EditEmployer' },
  { path: '/roles', component: Roles },
  { path: '/roles/create', component: RoleForm },
  { path: '/roles/update/:id', component: RoleForm, name: 'EditRole' },

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

  { path: '/w/tasks', component: WorkerTasks },
  { path: '/w/tasks/1', component: WorkerTask },
  { path: '/w/profile', component: WorkerProfile },
  { path: '/w/times', component: WorkerTimes },
  { path: '/w/change', component: ChangeWorker },
];
