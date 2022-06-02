import Maska from 'maska';
import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { authByTokenFromLocalstorage } from './services/auth/login';
import Can from './components/can';
// import uiImporteur from './plugins/ui-importeur';

// eslint-disable-next-line no-extend-native
Array.prototype.deleteById = function (target) {
  return !!(this.splice(this.findIndex(({ id }) => id === target), 1).length);
};

const app = createApp(App);

// eslint-disable-next-line no-underscore-dangle
window.__STO_DEV__ = import.meta.env.DEV;

if (__STO_DEV__) app.config.performance = true; // for dev

app.component('v-can', Can);

(async () => {
  try {
    await authByTokenFromLocalstorage(router);
  } finally {
    // app.use(uiImporteur);
    app.use(router);
    app.use(Maska);
    app.mount('#app');
  }
})();
