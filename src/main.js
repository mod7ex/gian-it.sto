import Toast from 'vue-toastification';
import Maska from 'maska';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { authByTokenFromLocalstorage } from './services/login';

const app = createApp(App);

const appWrapper = async () => {
  await authByTokenFromLocalstorage(router);

  app.use(router);
  app.use(Maska);
  app.use(Toast, { position: 'bottom-left' });
  app.mount('#app');
};

appWrapper();
