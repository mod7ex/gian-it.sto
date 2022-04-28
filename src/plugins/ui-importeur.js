import UIComponents from '../components/_globals';

export default {
  install(app, options) {
    Object.entries(UIComponents).forEach(([path, module]) => {
      const name = path.split('/').pop()?.replace('.vue', '');
      app.component(name, module.default);
    });
  },
};
