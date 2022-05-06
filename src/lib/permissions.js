import useAuth from '~/composables/useAuth.js';

const { isUserLogged, user } = useAuth();

const routesPermissionsMap = {
  Finances: 'crud finances',
  Storages: 'crud storages',
  Tasks: ['read tasks', 'crud tasks'],
  TaskCreateForm: 'create tasks',

  Employers: ['read users', 'crud users'],
  EmployerForm: 'crud users',
  EditEmployer: 'crud users',

  Clients: ['read clients', 'crud clients'],
  Pipelines: 'crud pipelines',
  Departments: 'crud departments',

  Roles: 'crud roles',
  RoleForm: 'crud roles',
  EditRole: 'crud roles',
};

export function userHasPermission(permissionName) {
  return !!(user.value.permissions.find((perm) => (perm.name === permissionName)));
}

export function isRouteAccessableForCurrentUser(routeName) {
  if (!routesPermissionsMap[routeName]) return true;

  const maybePermissionName = routesPermissionsMap[routeName];

  // one role is enough to let the user pass (| <--> U)
  if (Array.isArray(maybePermissionName)) return !!(maybePermissionName.find((perm) => userHasPermission(perm)));

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
