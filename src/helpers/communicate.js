import communicate from '~/helpers/communicate.json';

const recursionProxy = (subject) => new Proxy(subject, {
  get(target, key) {
    const nestedSubject = target[key];
    if (typeof nestedSubject === 'object') {
      return recursionProxy(nestedSubject);
    }

    return nestedSubject ?? target._ ?? 'Fix the messages file'; // string
  },
});

export default recursionProxy(communicate);
