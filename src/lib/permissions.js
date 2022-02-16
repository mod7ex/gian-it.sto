import useAuth from '~/composables/useAuth.js';
import routesPermissionsMap from './permissionsMap';

function isUserHasPermission(permissionName) {
  const { user } = useAuth();

  const permissionFound = user.value.permissions.find((perm) => (perm.name === permissionName));

  if (permissionFound) {
    return true;
  }

  return false;
}

function processGuestRoutes(to, next) {
  const { isUserLogged } = useAuth();

  function isRouteForGuests() {
    if (to.meta.guest) {
      return true;
    }
    return false;
  }

  if (isRouteForGuests() && isUserLogged.value) {
    next('/dashboard');
  }
  if (!isRouteForGuests() && !isUserLogged.value) {
    next('/');
  }
}

function isPathAccessableForCurrentUser(routePath) {
  if (routesPermissionsMap[routePath]) {
    const permissionName = routesPermissionsMap[routePath];

    if (Array.isArray(permissionName)) {
      const hasAtLeastOneNeeded = !!permissionName.find((perm) => isUserHasPermission(perm));
      if (!hasAtLeastOneNeeded) return false;
    } else if (!isUserHasPermission(permissionName)) return false;

    return true;
  }

  return true;
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
