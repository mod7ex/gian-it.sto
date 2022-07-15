import { reactive, effectScope } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import store from '~/store/processes/diagnostic-card';
import useAppRouter from '~/composables/useAppRouter';
import formRules from '~/validationsRules/process';
import departmentStore from '~/store/departments';

const { current } = departmentStore;
const { drop } = store;

let question;
let v$;

const clearMemory = () => {
  question = undefined;
  v$ = undefined;
};

const setField = function (key) { // function should be reviewed
  if (key === 'answers_and_recommendations') {
    question[key] = this.map_answers ?? [{}];
    return;
  }
  question[key] = this[key] ?? '';
};

const setForm = (payload = {}) => {
  Object.getOwnPropertyNames(question).forEach(setField, payload);
};

export default () => effectScope().run(() => {
  const { back, isThePage: isUpdate, route } = useAppRouter('DiagnosticCardEdit');

  if (!question) {
    question = reactive({
      id: '',
      department_id: current,

      name: '',
      options: [''],

      params: [{ options: [''] }], // {title: '', options: ['lorum ipsom']}
      comment: { title: '', content: '' },
      note: '',
    });

    v$ = useVuelidate(formRules(), question, { $lazy: true });
  }

  const saveForm = async () => {
    const isValideForm = await v$.value.$validate();

    if (!isValideForm) return;

    v$.value.$reset();

    const { success } = await save.map_question(question, undefined, true);

    try {
      return { success };
    } finally {
      if (success) back();
    }
  };

  const dropQuestion = async () => {
    const { success, message } = await drop(route.params.id);
    success && back();
    return { success, message };
  };

  const atMounted = async () => {
    if (isUpdate.value) {
      const { id } = route.params;
      if (id) {
        const ar = await $.map_question(id);
        setForm(ar);
      }
    }
  };

  return {
    question,
    atMounted,
    isUpdate,
    saveForm,
    dropQuestion,
    v$,
    clearMemory,
  };
});
