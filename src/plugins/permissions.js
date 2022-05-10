export default {
  install(app, options) {
    app.directive('can', (el, binding, vnode) => {
      // we might implement a directive to handle authorization
      // but dirrectives works well with native elements only
    });
  },
};
