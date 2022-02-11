import useAuth from "../composables/useAuth";


function isUserHasPermission(permissionName) {
  const {
    user
  } = useAuth();

  const permissionFound = user.value.permissions.find((perm) => {
    if (perm.name === permissionName) {
      return true;
    }
  })

  if (permissionFound) {
    return true;
  }

  return false;
}


function processGuestRoutes(to, next) {
  const {
    isUserLogged
  } = useAuth();
  const guestsRoutes = ["/", "/forgot-password", "/refresh-password"]

  function isRouteForGuests(routePath) {
    return guestsRoutes.includes(routePath)
  }

  if (isRouteForGuests(to.path) && isUserLogged.value) {
    next("/dashboard");
  }
  if (!isRouteForGuests(to.path) && !isUserLogged.value) {
    next("/");
  }
}

const routesPermissionsMap = {
  "/finances": "crud finances",
  "/storages": "crud storages",
  "/tasks": ["read tasks", "crud tasks"],
  "/tasks/create": "create tasks",
  "/employers": ["read users", "crud users"],
  "/clients": ["read clients", "crud clients"],
  "/pipelines": "crud pipelines"
}


function isPathAccessableForCurrentUser(routePath)
{
  if (routesPermissionsMap[routePath]) {
    const permissionName = routesPermissionsMap[routePath];

    if(Array.isArray(permissionName)){
      const hasAtLeastOneNeeded = !! permissionName.find((perm) => {
        if(isUserHasPermission(perm)){
          return true;
        }
      });
      if(! hasAtLeastOneNeeded) return false;
    } else {
      if (!isUserHasPermission(permissionName)) return false;
    }

    return true;
  }

  return true;
}

function processProtectedRoutes(to, next) {
  if (! isPathAccessableForCurrentUser(to.path)) next("/dashboard");
}

function initPermissionsProtect(router) {
  router.beforeEach((to, from, next) => {

    processGuestRoutes(to, next)

    processProtectedRoutes(to, next)

    next();
  });
}

export {
  initPermissionsProtect,
  isPathAccessableForCurrentUser
}
