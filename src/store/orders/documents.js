import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
  templates: [],
  selectedTemplates: [],
});

const selecteTemplate = (i) => {
  state.selectedTemplates.push(i);
};

const handleDocToggle = (i, locally) => {
  const index = state.selectedTemplates.indexOf(i);

  if (index !== -1 || locally) {
    state.selectedTemplates.splice(index, 1);
    return;
  }

  state.selectedTemplates.push(i);
};

const reset = () => {
  state.raw = [];
  state.templates = [];
};

const load = async (payload) => {
  state.raw = await $.orders(payload);
};

const loadTemplates = async (payload) => {
  state.templates = await $.document_templates(payload);
};

const drop = async (id) => _$.order(id, (v) => state.raw.deleteById(v));

const dropTemplate = async (id) => _$.document_template(id, (v) => state.templates.deleteById(v));

export default {
  state: readonly(state),
  load,
  loadTemplates,
  drop,
  dropTemplate,
  reset,
  selecteTemplate,
  handleDocToggle,

  // options: computed(() => state.raw.map(({ id, title }) => ({
  //   value: id,
  //   label: title,
  // }))),
};
