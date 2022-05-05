/*
 * https://stackoverflow.com/questions/72130179/how-to-handle-promises-when-using-call-bind-apply-with-javascript-functions
 *
 * both ways works
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
