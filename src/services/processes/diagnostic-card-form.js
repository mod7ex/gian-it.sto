import { reactive, effectScope, ref, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import store from '~/store/processes/diagnostic-card';
import useAppRouter from '~/composables/useAppRouter';
import { whyRules as formRules } from '~/validationsRules/process';

const { drop } = store;

let fields;
let dc_template;
let v$;

/*
const fields = ref([
  {
    type: 'check_list',
    data: {
      title: 'some randome text goes here',
      items: [
        'some randome text goes 1 soem other stuff ',
        'some randome text goes 3 last but not least game over ...',
        'some  text goes  again2',
        'some randome text goes 1 soem other stuff ',
        'some  text goes  again2',
        'some randome text goes 3 last but not least game over ...',
        'some  text goes  again 2 mqfo qf',
      ],
    },
  },
  {
    type: 'text',
    data: 'some randome text goes here',
  },
  {
    type: 'indication',
    data: ['До', 'Что остановили'],
  },
  {
    type: 'check_list',
    data: {
      title: 'some randome text yh ',
      items: [
        'some randome text goes 1 soem other stuff ',
        'some  text goes  again2',
        'some randome text goes 1 soem stuff ',
      ],
    },
  },
]);
*/

const clearMemory = () => {
  dc_template = undefined;
  fields = undefined;
  v$ = undefined;
};

const setField = function (key) {
  // dc_template[key] = this[key] ?? '';
  dc_template.id = this.id;
  dc_template.title = this.title;
  fields.value = this.data;
};

const setForm = (payload = {}) => { Object.getOwnPropertyNames(dc_template).forEach(setField, payload); };

export default () => effectScope().run(() => {
  const { back, isThePage: isUpdate, route } = useAppRouter('DiagnosticCardEdit');

  if (!dc_template) {
    dc_template = reactive({
      id: '',
      title: '',
      // note: '',
    });

    fields = ref([]);

    v$ = useVuelidate(formRules(), dc_template, { $lazy: true });
  }

  const saveForm = async () => {
    dc_template.data = fields.value;

    const isValideForm = await v$.value.$validate();

    if (!isValideForm) return;

    v$.value.$reset();

    const { success } = await save.map(dc_template, undefined, true);

    try {
      return { success };
    } finally {
      if (success) back();
    }
  };

  const dropDc = async () => {
    const { success, message } = await drop(route.params.id);
    success && back();
    return { success, message };
  };

  const atMounted = async () => {
    console.log(dc_template?.id);
    if (fields?.value?.length && dc_template?.title) return;

    if (isUpdate.value) {
      const { id } = route.params;
      if (id) {
        const ar = await $.map(id);
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
    fields,
  };
});
