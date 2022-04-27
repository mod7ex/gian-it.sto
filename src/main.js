import { createApp } from 'vue';
import Toast from 'vue-toastification';
import Maska from 'maska';
import App from './App.vue';
import router from './router';
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
