/*
 * https://stackoverflow.com/questions/72130179/how-to-handle-promises-when-using-call-bind-apply-with-javascript-functions
 *
 * both ways works
 *
 * function might be used to protect methods that require permission
 */

// eslint-disable-next-line func-names
export const maybeRun = (cb, allow, ctx = window) => function (...args) {
  if (!allow) return false;

  return cb.call(ctx, ...args);
  // return cb.apply(ctx, arguments);
};

// eslint-disable-next-line func-names
export const maybeRun0 = (cb, allow, ctx = window) => async function (...args) {
  if (!allow) return;

  await cb.call(ctx, ...args);
  // await  cb.apply(ctx, arguments);
};

export const hyphenatedDateFormat = (strDate) => {
  const [d, m, y] = strDate.split('.');
  return `${y}-${m}-${d}`;
};

export const cleanUp = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (!Reflect.get(obj, prop)) {
      Reflect.deleteProperty(obj, prop);
    }
  });
  return obj;
};

export const debounce = function (fn, d = 1500) {
  let timer;
  return function () {
    const ctx = this;

    // eslint-disable-next-line prefer-rest-params
    const args = arguments;

    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(ctx, args);
    }, d);
  };
};
