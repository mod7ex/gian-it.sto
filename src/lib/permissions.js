import useAuth from '~/composables/useAuth.js';
import routesPermissionsMap from './permissionsMap.js';

function isUserHasPermission(permissionName) {
  const { user } = useAuth();

  const permissionFound = user.value.permissions.find((perm) => (perm.name === permissionName));

  return permissionFound !== undefined;
}

function processGuestRoutes(to, next) {
  const { isUserLogged } = useAuth();

  function isRouteForGuests() {
    return !!to.meta.guest;
  }

  if (isRouteForGuests() && isUserLogged.value) {
    next('/dashboard');
  }

  if (!isRouteForGuests() && !isUserLogged.value) {
    next('/');
  }
}

function isPathAccessableForCurrentUser(routePath) {
  if (!routesPermissionsMap[routePath]) {
    return true;
  }

  const permissionName = routesPermissionsMap[routePath];

  if (Array.isArray(permissionName)) {
    return permissionName.find((perm) => isUserHasPermission(perm)) !== undefined;
  }

  return isUserHasPermission(permissionName);
}

function processProtectedRoutes(to, next) {
  if (!isPathAccessableForCurrentUser(to.path)) {
    next('/dashboard');
  }
}

function initPermissionsProtect(router) {
  router.beforeEach((to, from, next) => {
    processGuestRoutes(to, next);

    processProtectedRoutes(to, next);

    next();
  });
}

export {
  initPermissionsProtect,
  isPathAccessableForCurrentUser,
};
