import { reactive, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import store from '~/store/processes/diagnostic-card';
import useAppRouter from '~/composables/useAppRouter';
import formRules from '~/validationsRules/process';

let question;
let v$;

export default () => effectScope().run(() => {
  const { drop } = store;
  const { back, isThePage: isUpdate, route } = useAppRouter('DiagnosticCardEdit');

  if (!question) {
    question = reactive({
      id: '',
      question: '',
      answers_and_recommendations: [{}],
    });

    v$ = useVuelidate(formRules(), question, { $lazy: true });
  }

  const setField = function (key) {
    if (key === 'answers_and_recommendations') {
      question[key] = this.map_answers ?? [{}];
      return;
    }
    question[key] = this[key] ?? '';
  };

  const setForm = (payload = {}) => {
    Object.getOwnPropertyNames(question).forEach(setField, payload);
  };

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

  onScopeDispose(() => {
    question = undefined;
  });

  return {
    question,
    atMounted,
    isUpdate,
    saveForm,
    dropQuestion,
    v$,
  };
});
