import { createRouter, createWebHistory } from 'vue-router';
import navigationGuards from '~/lib/permissions.js';
import { pingLoader } from '~/composables/useAppLoader.js';

const routes = [
  { path: '/', component: () => import(/* webpackChunkName: "login-page" */ '@/Pages/Login/Login.vue'), name: 'Login', meta: { guest: true } },
  { path: '/forgot-password', component: () => import(/* webpackChunkName: "ForgotPassword" */ '@/Pages/Login/ForgotPassword.vue'), name: 'ForgotPassword', meta: { guest: true } },
  { path: '/password/reset/:token', component: () => import(/* webpackChunkName: "RefreshPassword" */ '@/Pages/Login/RefreshPassword.vue'), name: 'RefreshPassword', meta: { guest: true } },

  { path: '/dashboard', component: () => import(/* webpackChunkName: "Dashboard" */ '@/Pages/Office/Dashboard.vue'), name: 'Dashboard' },

  { path: '/orders', component: () => import(/* webpackChunkName: "Orders" */ '@/Pages/Office/Orders.vue'), name: 'Orders' },
  { path: '/orders/create', component: () => import(/* webpackChunkName: "OrderForm" */ '@/Pages/Office/OrderForm.vue'), name: 'OrderForm' },

  { path: '/tasks', component: () => import(/* webpackChunkName: "Tasks" */ '@/Pages/Office/Tasks.vue'), name: 'Tasks' },
  { path: '/tasks/1', component: () => import(/* webpackChunkName: "Task" */ '@/Pages/Office/Task.vue'), name: 'Task' },
  { path: '/tasks/1/edit', component: () => import(/* webpackChunkName: "TaskEditForm" */ '@/Pages/Office/TaskForm.vue'), name: 'TaskEditForm' },
  { path: '/tasks/create', component: () => import(/* webpackChunkName: "TaskCreateForm" */ '@/Pages/Office/TaskForm.vue'), name: 'TaskCreateForm' },

  { path: '/processes', component: () => import(/* webpackChunkName: "Processes" */ '@/Pages/Office/Processes.vue'), name: 'Processes' },
  { path: '/processes/create', component: () => import(/* webpackChunkName: "ProcessesForm" */ '@/Pages/Office/ProcessesForm.vue'), name: 'ProcessesForm' },
  { path: '/processes/1', component: () => import(/* webpackChunkName: "Process" */ '@/Pages/Office/Process.vue'), name: 'Process' },
  { path: '/processes/1/create', component: () => import(/* webpackChunkName: "ProcessForm" */ '@/Pages/Office/ProcessForm.vue'), name: 'ProcessForm' },

  { path: '/storages', component: () => import(/* webpackChunkName: "Storages" */ '@/Pages/Office/Storages.vue'), name: 'Storages' },
  { path: '/storages/:id', component: () => import(/* webpackChunkName: "Storage" */ '@/Pages/Office/Storage.vue'), name: 'Storage' },
  { path: '/storages/:id/create', component: () => import(/* webpackChunkName: "StorageProductForm" */ '@/Pages/Office/StorageForm.vue'), name: 'StorageForm' },
  { path: '/storages/:id/update/:product', component: () => import(/* webpackChunkName: "StorageProductForm" */ '@/Pages/Office/StorageForm.vue'), name: 'EditStorage' },

  { path: '/clients', component: () => import(/* webpackChunkName: "Clients" */ '@/Pages/Office/Clients.vue'), name: 'Clients' },
  { path: '/clients/create', component: () => import(/* webpackChunkName: "ClientForm" */ '@/Pages/Office/ClientForm.vue'), name: 'ClientForm' },
  { path: '/clients/update/:id', component: () => import(/* webpackChunkName: "EditClient" */ '@/Pages/Office/ClientForm.vue'), name: 'EditClient' },

  { path: '/employers', component: () => import(/* webpackChunkName: "Employers" */ '@/Pages/Office/Employers.vue'), name: 'Employers' },
  { path: '/employers/create', component: () => import(/* webpackChunkName: "EmployerForm" */ '@/Pages/Office/EmployerForm.vue'), name: 'EmployerForm' },
  { path: '/employers/update/:id', component: () => import(/* webpackChunkName: "EditEmployer" */ '@/Pages/Office/EmployerForm.vue'), name: 'EditEmployer' },

  { path: '/roles', component: () => import(/* webpackChunkName: "Roles" */ '@/Pages/Office/Roles.vue'), name: 'Roles' },
  { path: '/roles/create', component: () => import(/* webpackChunkName: "RoleForm" */ '@/Pages/Office/RoleForm.vue'), name: 'RoleForm' },
  { path: '/roles/update/:id', component: () => import(/* webpackChunkName: "RoleForm" */ '@/Pages/Office/RoleForm.vue'), name: 'EditRole' },

  { path: '/departments', component: () => import(/* webpackChunkName: "Departments" */ '@/Pages/Office/Departments.vue'), name: 'Departments' },

  { path: '/producers', component: () => import(/* webpackChunkName: "Producers" */ '~/components/Pages/Office/Producers.vue'), name: 'Producers' },

  { path: '/cars', component: () => import(/* webpackChunkName: "Cars" */ '@/Pages/Office/Cars.vue'), name: 'Cars' },
  { path: '/cars/create', component: () => import(/* webpackChunkName: "CarForm" */ '@/Pages/Office/CarForm.vue'), name: 'CarForm' },
  { path: '/cars/update/:id', component: () => import(/* webpackChunkName: "CarForm" */ '@/Pages/Office/CarForm.vue'), name: 'EditCar' },
  { path: '/car-marks', component: () => import(/* webpackChunkName: "CarMarks" */ '@/Pages/Office/CarMarks.vue'), name: 'CarMarks' },
  { path: '/car-models', component: () => import(/* webpackChunkName: "CarModels" */ '@/Pages/Office/CarModels.vue'), name: 'CarModels' },

  { path: '/why', component: () => import(/* webpackChunkName: "Why" */ '@/Pages/Office/Why.vue'), name: 'Why' },
  { path: '/why/create', component: () => import(/* webpackChunkName: "WhyForm" */ '@/Pages/Office/WhyForm.vue'), name: 'WhyForm' },

  { path: '/finances', component: () => import(/* webpackChunkName: "Finances" */ '@/Pages/Office/Finances.vue'), name: 'Finances' },
  { path: '/finances-groups', component: () => import(/* webpackChunkName: "FinanceGroups" */ '@/Pages/Office/FinanceGroups.vue'), name: 'FinanceGroups' },

  { path: '/settings', component: () => import(/* webpackChunkName: "Settings" */ '@/Pages/Office/Settings.vue'), name: 'Settings' },

  { path: '/pipelines', component: () => import(/* webpackChunkName: "Pipelines" */ '@/Pages/Office/Pipelines.vue'), name: 'Pipelines' },
  { path: '/pipelines/create', component: () => import(/* webpackChunkName: "PipelineForm" */ '@/Pages/Office/PipelineForm.vue'), name: 'PipelineForm' },

  { path: '/diagnostic-card', component: () => import(/* webpackChunkName: "DiagnosticCard" */ '@/Pages/Office/DiagnosticCard.vue'), name: 'DiagnosticCard' },
  { path: '/diagnostic-card/create', component: () => import(/* webpackChunkName: "DiagnosticCardForm" */ '@/Pages/Office/DiagnosticCardForm.vue'), name: 'DiagnosticCardForm' },

  { path: '/profile', component: () => import(/* webpackChunkName: "Profile" */ '@/Pages/Office/Profile.vue'), name: 'Profile' },

  { path: '/elements', component: () => import(/* webpackChunkName: "ElementsPage" */ '@/Pages/Office/Elements.vue'), name: 'ElementsPage' },

  { path: '/w/tasks', component: () => import(/* webpackChunkName: "WorkerTasks" */ '@/Pages/Work/Tasks.vue'), name: 'WorkerTasks' },
  { path: '/w/tasks/1', component: () => import(/* webpackChunkName: "WorkerTask" */ '@/Pages/Work/Task.vue'), name: 'WorkerTask' },
  { path: '/w/profile', component: () => import(/* webpackChunkName: "WorkerProfile" */ '@/Pages/Work/Profile.vue'), name: 'WorkerProfile' },
  { path: '/w/times', component: () => import(/* webpackChunkName: "WorkerTimes" */ '@/Pages/Work/Times.vue'), name: 'WorkerTimes' },
  { path: '/w/change', component: () => import(/* webpackChunkName: "ChangeWorker" */ '@/Pages/Work/ChangeWorker.vue'), name: 'ChangeWorker' },

  { path: '/:pathMatch(.*)*', component: () => import(/* webpackChunkName: "404" */ '@/Pages/404.vue'), name: '404' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === '404') {
    if (from.name === undefined) return next({ name: 'Dashboard' });
    return;
  }

  next();
});

router.beforeEach(navigationGuards);

router.beforeEach(pingLoader);

router.afterEach(() => pingLoader(false));

export default router;
