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

export default function initPermissionsProtect(router) {
  router.beforeEach((to, from, next) => {

    processGuestRoutes(to, next)


    if (to.path === "/orders") {
      if (!isUserHasPermission("crud pipelines")) next("/dashboard");
    }

    if (to.path === "/storages") {
      if (!isUserHasPermission("crud storages")) next("/dashboard");
    }

    next();
  });
}
