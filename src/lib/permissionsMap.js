const routesPermissionsMap = {
  '/finances': 'crud finances',
  '/storages': 'crud storages',
  '/tasks': ['read tasks', 'crud tasks'],
  '/tasks/create': 'create tasks',
  '/employers': ['read users', 'crud users'],
  '/clients': ['read clients', 'crud clients'],
  '/pipelines': 'crud pipelines',
};
export default routesPermissionsMap;
