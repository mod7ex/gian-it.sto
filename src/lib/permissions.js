// import { computed } from 'vue';
import useAuth from '~/composables/useAuth.js';

const { isUserLogged, user, isAdmin, userDepartment } = useAuth();

const routesPermissionsMap = {
  // Todo: copy all pages from router and add permissions the router can catch some forgotten things

  Orders: ['crud orders', 'read orders'],

  Finances: 'crud finances',

  Storages: 'crud storages',

  Processes: 'crud processes',

  // Tasks: ['read tasks', 'read department tasks', 'read own tasks'],
  // Task: ['read tasks', 'read department tasks', 'read own tasks'],
  // TaskEdit: ['update tasks', 'update department tasks', 'update own tasks'],
  // TaskCreate: 'create tasks',

  TaskEdit: 'update tasks',
  TaskCreate: 'create tasks',

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
    if (!isRouteForGuests) return next('/');
  }

  // auth users  ------ order matters
  if (isRouteForGuests) return next('/dashboard');
  if (accessable) return next();
  if (!accessable) return next('/dashboard');
};

export default navigationGuards;

export const PERMISSIONS = {
  TASKS: {
    READ: () => userHasPermission('read tasks'),
    READ_DEPARTMENT: () => userHasPermission('read department tasks') && !userHasPermission('read tasks'),
    READ_OWN: () => !userHasPermission('read department tasks') && !userHasPermission('read tasks'),

    UPDATE: () => userHasPermission('update tasks'),

    DELETE: () => userHasPermission('delete tasks'),
  },
};

/**
 *
 * @param {Task} item
 * @param {'delete' | 'update'} action
 * @returns {boolean}
 */
export const canTasks = (item, action = 'update') => {
  if (action === 'read') {
    if (PERMISSIONS.TASKS[`${action.toUpperCase()}_OWN`]()) {
      const theAuthor = typeof item.author === 'object' ? item.author?.id : item.author_id;
      if (theAuthor != user.value?.id) return false;
      return true;
    }

    if (PERMISSIONS.TASKS[`${action.toUpperCase()}_DEPARTMENT`]()) {
      const theDepartment = typeof item.department === 'object' ? item.department?.id : item.department_id;
      if (theDepartment != userDepartment.value) return false;
      return true;
    }
  }

  // you're an admin --->

  return PERMISSIONS.TASKS[`${action.toUpperCase()}`]();
};
