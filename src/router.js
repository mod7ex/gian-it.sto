import { createRouter, createWebHistory } from 'vue-router';
import navigationGuards from '~/lib/permissions.js';

import { pingLoader } from '~/composables/useAppLoader.js';

const routes = [
  { path: '/', component: () => import(/* webpackChunkName: "login-page" */ '@/Pages/Login/Login.vue'), name: 'Login', meta: { guest: true } },
  { path: '/forgot-password', component: () => import('@/Pages/Login/ForgotPassword.vue'), name: 'ForgotPassword', meta: { guest: true } },
  { path: '/refresh-password/:token', component: () => import('@/Pages/Login/RefreshPassword.vue'), name: 'RefreshPassword', meta: { guest: true } },

  { path: '/dashboard', component: () => import('@/Pages/Office/Dashboard.vue'), name: 'Dashboard' },

  { path: '/orders', component: () => import('@/Pages/Office/Orders.vue'), name: 'Orders' },
  { path: '/orders/create', component: () => import('@/Pages/Office/OrderForm.vue'), name: 'OrderForm' },

  { path: '/tasks', component: () => import('@/Pages/Office/Tasks.vue'), name: 'Tasks' },
  { path: '/tasks/1', component: () => import('@/Pages/Office/Task.vue'), name: 'Task' },
  { path: '/tasks/1/edit', component: () => import('@/Pages/Office/TaskForm.vue'), name: 'TaskEditForm' },
  { path: '/tasks/create', component: () => import('@/Pages/Office/TaskForm.vue'), name: 'TaskCreateForm' },

  { path: '/processes', component: () => import('@/Pages/Office/Processes.vue'), name: 'Processes' },
  { path: '/processes/create', component: () => import('@/Pages/Office/ProcessesForm.vue'), name: 'ProcessesForm' },
  { path: '/processes/1', component: () => import('@/Pages/Office/Process.vue'), name: 'Process' },
  { path: '/processes/1/create', component: () => import('@/Pages/Office/ProcessForm.vue'), name: 'ProcessForm' },

  { path: '/storages', component: () => import('@/Pages/Office/Storages.vue'), name: 'Storages' },
  { path: '/storages/create', component: () => import('@/Pages/Office/StoragesForm.vue'), name: 'StoragesForm' },
  { path: '/storages/1', component: () => import('@/Pages/Office/Storage.vue'), name: 'Storage' },
  { path: '/storages/1/create', component: () => import('@/Pages/Office/StorageForm.vue'), name: 'StorageForm' },

  { path: '/clients', component: () => import('@/Pages/Office/Clients.vue'), name: 'Clients' },
  { path: '/clients/create', component: () => import('@/Pages/Office/ClientForm.vue'), name: 'ClientForm' },

  { path: '/employers', component: () => import('@/Pages/Office/Employers.vue'), name: 'Employers' },
  { path: '/employers/create', component: () => import('@/Pages/Office/EmployerForm.vue'), name: 'EmployerForm' },
  { path: '/employers/update/:id', component: () => import('@/Pages/Office/EmployerForm.vue'), name: 'EditEmployer' },

  { path: '/roles', component: () => import('@/Pages/Office/Roles.vue'), name: 'Roles' },
  { path: '/roles/create', component: () => import('@/Pages/Office/RoleForm.vue'), name: 'RoleForm' },
  { path: '/roles/update/:id', component: () => import('@/Pages/Office/RoleForm.vue'), name: 'EditRole' },

  { path: '/departments', component: () => import('@/Pages/Office/Departments.vue'), name: 'Departments' },
  { path: '/department/:id', component: () => import('@/Pages/Office/DepartmentUsers.vue'), name: 'DepartmentUsers' },

  { path: '/developers', component: () => import('@/Pages/Office/Developers.vue'), name: 'Developers' },
  { path: '/developers/create', component: () => import('@/Pages/Office/DeveloperForm.vue'), name: 'DeveloperForm' },

  { path: '/cars', component: () => import('@/Pages/Office/Cars.vue'), name: 'Cars' },
  { path: '/cars/create', component: () => import('@/Pages/Office/CarForm.vue'), name: 'CarForm' },
  { path: '/car-marks', component: () => import('@/Pages/Office/CarMarks.vue'), name: 'CarMarks' },
  { path: '/car-marks/create', component: () => import('@/Pages/Office/CarMarksForm.vue'), name: 'CarMarksForm' },
  { path: '/car-models', component: () => import('@/Pages/Office/CarModels.vue'), name: 'CarModels' },
  { path: '/car-models/create', component: () => import('@/Pages/Office/CarModelsForm.vue'), name: 'CarModelsForm' },

  { path: '/why', component: () => import('@/Pages/Office/Why.vue'), name: 'Why' },
  { path: '/why/create', component: () => import('@/Pages/Office/WhyForm.vue'), name: 'WhyForm' },

  { path: '/finances', component: () => import('@/Pages/Office/Finances.vue'), name: 'Finances' },
  { path: '/finances/create', component: () => import('@/Pages/Office/FinanceForm.vue'), name: 'FinanceForm' },
  { path: '/finances-groups', component: () => import('@/Pages/Office/FinanceGroup.vue'), name: 'FinanceGroup' },
  { path: '/finances-groups/create', component: () => import('@/Pages/Office/FinanceGroupForm.vue'), name: 'FinanceGroupForm' },

  { path: '/settings', component: () => import('@/Pages/Office/Settings.vue'), name: 'Settings' },

  { path: '/pipelines', component: () => import('@/Pages/Office/Pipelines.vue'), name: 'Pipelines' },
  { path: '/pipelines/create', component: () => import('@/Pages/Office/PipelineForm.vue'), name: 'PipelineForm' },

  { path: '/diagnostic-card', component: () => import('@/Pages/Office/DiagnosticCard.vue'), name: 'DiagnosticCard' },
  { path: '/diagnostic-card/create', component: () => import('@/Pages/Office/DiagnosticCardForm.vue'), name: 'DiagnosticCardForm' },

  { path: '/profile', component: () => import('@/Pages/Office/Profile.vue'), name: 'Profile' },

  { path: '/elements', component: () => import('@/Pages/Office/Elements.vue'), name: 'ElementsPage' },

  { path: '/w/tasks', component: () => import('@/Pages/Work/Tasks.vue'), name: 'WorkerTasks' },
  { path: '/w/tasks/1', component: () => import('@/Pages/Work/Task.vue'), name: 'WorkerTask' },
  { path: '/w/profile', component: () => import('@/Pages/Work/Profile.vue'), name: 'WorkerProfile' },
  { path: '/w/times', component: () => import('@/Pages/Work/Times.vue'), name: 'WorkerTimes' },
  { path: '/w/change', component: () => import('@/Pages/Work/ChangeWorker.vue'), name: 'ChangeWorker' },

  { path: '/:pathMatch(.*)*', component: () => import('@/Pages/404.vue'), name: '404' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  pingLoader(true);
});

router.beforeEach(navigationGuards);

export default router;
