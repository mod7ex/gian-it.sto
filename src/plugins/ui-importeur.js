import UIComponents from '../components/_globals';

const notTobeImported = ['Toast', 'Dialog'];

export default {
  install(app, options) {
    Object.entries(UIComponents).forEach(([path, module]) => {
      const name = path.split('/').pop()?.replace('.vue', '');
      if (notTobeImported.includes(name)) return;
      app.component(name, module.default);
    });
  },
};
