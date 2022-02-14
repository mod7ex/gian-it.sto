import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import Toast from 'vue-toastification';
import Maska from 'maska';
import App from './App.vue';
import routes from './routes.js';
import { initPermissionsProtect } from '~/lib/permissions.js';

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

initPermissionsProtect(router);

createApp(App)
  .use(router)
  .use(Maska)
  .use(Toast, {
    position: 'bottom-left',
  })
  .mount('#app');
