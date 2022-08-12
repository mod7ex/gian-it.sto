import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
  // templates: [],
  // selectedTemplates: [],
  links: [],
});

// const selecteTemplate = (i) => {
//   state.selectedTemplates.push(i);
// };

const reset = () => {
  state.raw = [];
  state.templates = [];
};

const load = async (payload) => {
  state.raw = await $.orders(payload);
};

// const loadTemplates = async (payload) => { state.templates = await $.document_templates(payload); };

const LABELS = { certificate: 'Сертификат', completion: 'Завершение', order: 'Заказ', reception: 'Прием' };

const loadLinks = async (order) => {
  const { pdf } = await $({ key: `documents/${order}/generate` });
  state.links = Object.entries(pdf).map(([key, link]) => {
    const cle = key.split('.')[1];
    return { key: cle, label: LABELS[cle], link };
  });
};

const drop = async (id) => _$.order(id, (v) => state.raw.deleteById(v));

// const dropTemplate = async (id) => _$.document_template(id, (v) => state.templates.deleteById(v));

export default {
  state: readonly(state),
  load,
  // loadTemplates,
  drop,
  // dropTemplate,
  reset,
  // selecteTemplate,
  loadLinks,

  // options: computed(() => state.raw.map(({ id, title }) => ({
  //   value: id,
  //   label: title,
  // }))),
};
