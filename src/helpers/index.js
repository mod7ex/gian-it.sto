/*
 * https://stackoverflow.com/questions/72130179/how-to-handle-promises-when-using-call-bind-apply-with-javascript-functions
 *
 * both ways work
 *
 * function might be used to protect methods that require permission
 */

export const maybeRun = (cb, allow, ctx = window) => function (...args) {
  if (allow.value) {
    return cb.call(ctx, ...args);
    // return cb.apply(ctx, arguments);
  }
};

export const maybeRunSync = (cb, allow, ctx = window) => async function (...args) {
  if (allow) {
    await cb.call(ctx, ...args);
    // await  cb.apply(ctx, arguments);
  }
};

export const hyphenatedDateFormat = (strDate) => {
  const [d, m, y] = strDate.split('.');
  return `${y}-${m}-${d}`;
};

// cleaned up shallow copy
export const cleanUp = (obj, ...fields) => {
  const data = {};

  // fields will be deleted even if there is a value (fields)

  if (obj) {
    Object.keys(obj).forEach((prop) => {
      if (fields.includes(prop)) return;
      const val = Reflect.get(obj, prop);
      if (!val) return;
      Reflect.set(data, prop, val);
    });
  }

  return data;
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

// personsObjs is an array of users that have fields;
export const alphaGroupper = (personsObjs = [], field = '', shape) => [...new Set(personsObjs.map((item) => {
  const str = Reflect.get(item, field); // supposed to be string
  return str ? str[0].toUpperCase() : '_';
}))]
  .sort()
  .reduce((groups, key) => {
    // eslint-disable-next-line no-param-reassign
    groups[key] = personsObjs.filter((item) => {
      const str = Reflect.get(item, field);
      return (str ? str[0].toUpperCase() : '_') === key;
    }).map(shape);
    return groups;
  }, {});

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// ***********************************************************
export function isPlural(word = '') {
  if (word.includes('/')) {
    // eslint-disable-next-line no-param-reassign
    [word] = word.split('/');
  }

  return word[word.length - 1] === 's';
}

const ressourceFromKey = (key) => (key.includes('/') ? key.split('/')[0] : key);

const plurify = (exp) => {
  if (isPlural(exp)) return exp;
  if (exp[exp.length - 1] === 'y') {
    // eslint-disable-next-line no-return-assign
    return (exp += '$_').replace('y$_', 'ies');
  }
  return `${exp}s`;
};

const keyToPath = (key) => (key.includes('/') ? key : plurify(`${key.replace('_', '-')}`));

export const extract = (key = '') => ({ path: keyToPath(key), ressource: ressourceFromKey(key) });

// ***********************************************************

// all keys even none-enumerable
export const objectSignature = (target) => Object.getOwnPropertyNames(target).reduce((prev, currKey) => prev + target[currKey], '');

// export const objectSignature = (target) => Object.keys(target).reduce((prev, currKey) => prev + target[currKey], '');

export const deepCopyObj = (target) => JSON.parse(JSON.stringify(target));

export const generateShapedIdfromId = (id) => {
  id = `${id}`;

  while (id.length < import.meta.env.VITE_MAX_ORDERS_COUNT_DIGITS) {
    id = `0${id}`;
  }

  return id;
};

export const sto_parse_DMY_T = (payload = '') => {
  const [date, time] = payload.split(' ');

  const [d, mo, y] = date.split('.');
  const [h, mi] = time.split(':');
  return new Date(y, mo - 1, d, h, mi);
};

export const timeSince = (date) => {
  const seconds = Math.abs(Math.floor((new Date() - date) / 1000)); // A small issue of Timezone

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} года назад`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} месяца назад`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} дня назад`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} часа назад`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} минуты назад`;
  }
  return `${Math.floor(seconds)} секунды назад`;
};
