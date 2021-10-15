import { createApp } from 'vue';
import { createRouter, createWebHashHistory }  from 'vue-router';
import Toast from 'vue-toastification';
import App from './App.vue'
import routes from './routes.js';

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
});

createApp(App)
  .use(router)
  .use(Toast, {
    position: 'bottom-left'
  })
  .mount('#app')
