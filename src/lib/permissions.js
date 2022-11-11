// import { computed } from 'vue';
import useAuth from '~/composables/useAuth.js';

const { isUserLogged, user, userDepartment, userRole } = useAuth();

const routesPermissionsMap = {
  // Todo: copy all pages from router and add permissions the router can catch some forgotten things

  Orders: ['crud orders', 'read orders'],

  Finances: 'crud finances',

  Storages: 'crud storages',

  Processes: 'crud processes',

  Why: 'crud processes',

  Tasks: [
    'read tasks',
    'read department tasks',
    'read own tasks',
  ],
  Task: [
    'read tasks',
    'read department tasks',
    'read own tasks',
  ],

  Employers: ['read users', 'crud users'],
  EmployerForm: 'crud users',
  EditEmployer: 'crud users',

  Clients: ['read clients', 'crud clients'],

  Pipelines: 'crud pipelines',

  Departments: 'crud departments',

  Roles: 'crud roles',
  RoleForm: 'crud roles',
  EditRole: 'crud roles',

  Cars: ['crud cars', 'crud car marks', 'crud fuels', 'crud engine volumes', 'crud car models'],
};

export function userHasPermission(permissionName) {
  return !!(user.value.permissions.find((perm) => (perm.name === permissionName)));
}

export function userHasAtLeastOnePermission(permissionsArray, allowEmpty = false) {
  if (allowEmpty && permissionsArray.length === 0) return true;

  // one role is enough to let the user pass (| <--> U)
  return !!(permissionsArray.find((perm) => userHasPermission(perm)));
}

export function isRouteAccessableForCurrentUser(routeName) {
  if (!routesPermissionsMap[routeName]) return true;

  const maybePermissionName = routesPermissionsMap[routeName];

  // one role is enough to let the user pass (| <--> U)
  if (Array.isArray(maybePermissionName)) return userHasAtLeastOnePermission(maybePermissionName);

  return userHasPermission(maybePermissionName);
}

const navigationGuards = (to, from, next) => {
  const isRouteForGuests = !!to.meta.guest;
  const accessable = isRouteAccessableForCurrentUser(to.name);

  if (!isUserLogged.value) {
    // none-auth users  ------ order matters
    if (isRouteForGuests) return next();
    if (!isRouteForGuests) return next(`/?target=${window.location.pathname}`);
  }

  const nextRoute = userRole.value?.name === 'slecar' ? { name: 'WorkerTasks' } : to.query.target ?? '/orders'; /* 'dashboard' */

  // auth users  ------ order matters
  if (isRouteForGuests) return next(nextRoute);
  if (accessable) return next();
  if (!accessable) return next(nextRoute);
};

export default navigationGuards;

const has = userHasPermission;

export const PERMISSIONS = {
  TASKS: {
    READ: () => has('read tasks'),
    READ_DEPARTMENT: () => has('read department tasks') && !has('read tasks'),
    READ_OWN: () => has('read own tasks') && !has('read tasks') && !has('read department tasks'),

    UPDATE: () => has('update tasks'),
    UPDATE_DEPARTMENT: () => has('update department tasks') && !has('update tasks'),
    UPDATE_OWN: () => has('update own tasks') && !has('update tasks') && !has('update department tasks'),

    UPDATE_STAGE: () => has('update stage tasks'),
    UPDATE_STAGE_DEPARTMENT: () => has('update department stage tasks') && !has('update stage tasks'),
    UPDATE_STAGE_OWN: () => has('update own stage tasks') && !has('update stage tasks') && !has('update department stage tasks'),

    DELETE: () => has('delete tasks'),
  },
};

/**
 *
 * @param {Task} item
 * @param {'delete' | 'update' | 'update_stage' | 'update_status'} action
 * @returns {boolean}
 */
export const canTasks = (item, action = 'update') => {
  if (action === 'update_status') action = 'update_stage'; // update_stage is used for both (kanban & status)

  const ACTION = action.toUpperCase();

  const task_user = typeof item.user === 'object' ? item.user?.id : item.user_id;
  const task_department = typeof item.department === 'object' ? item.department?.id : item.department_id;

  if (action !== 'delete') {
    if (PERMISSIONS.TASKS[`${ACTION}_OWN`]()) {
      return task_user == user.value?.id;
    }

    if (PERMISSIONS.TASKS[`${ACTION}_DEPARTMENT`]()) {
      return task_department == userDepartment.value;
    }
  }

  // you're an admin | delete action
  return PERMISSIONS.TASKS[`${ACTION}`]();
};
