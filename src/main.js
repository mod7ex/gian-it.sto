import Maska from 'maska';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { authByTokenFromLocalstorage } from './services/auth/login';
import Can from './components/can';
// import uiImporteur from './plugins/ui-importeur';

const app = createApp(App);

app.config.performance = true; // for dev

app.component('v-can', Can);

(async () => {
  await authByTokenFromLocalstorage(router);

  // app.use(uiImporteur);
  app.use(router);
  app.use(Maska);
  app.mount('#app');
})();
