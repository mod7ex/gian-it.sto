import { reactive, effectScope } from 'vue';
import useVuelidate from '@vuelidate/core';
// import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import store from '~/store/processes/diagnostic-card';
import useAppRouter from '~/composables/useAppRouter';
import { whyRules as formRules } from '~/validationsRules/process';

const { drop } = store;

let dc_template;
let v$;

const clearMemory = () => {
  dc_template = undefined;
  v$ = undefined;
};

const setField = function (key) {
  if (key === 'answers_and_recommendations') {
    dc_template[key] = this.map_answers ?? [{}];
    return;
  }
  dc_template[key] = this[key] ?? '';
};

const setForm = (payload = {}) => { Object.getOwnPropertyNames(dc_template).forEach(setField, payload); };

export default () => effectScope().run(() => {
  const { back, isThePage: isUpdate, route } = useAppRouter('DiagnosticCardEdit');

  if (!dc_template) {
    dc_template = reactive({
      id: '',
      name: '',
      note: '',
    });

    v$ = useVuelidate(formRules(), dc_template, { $lazy: true });
  }

  const saveForm = async () => {
    console.log(dc_template);
    /*

    const isValideForm = await v$.value.$validate();

    if (!isValideForm) return;

    v$.value.$reset();

    const { success } = await save.map_question(dc_template, undefined, true);

    try {
      return { success };
    } finally {
      if (success) back();
    }

    */
  };

  const dropDc = async () => {
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
    dc_template,
    atMounted,
    isUpdate,
    saveForm,
    dropDc,
    v$,
    clearMemory,
  };
});
