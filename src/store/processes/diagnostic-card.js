import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';

const state = reactive({
  raw: [],
  templates: [],
  preview: undefined,
});

const reset = () => {
  state.raw = [];
  state.templates = [];
};

const load = async () => {
  state.raw = await $.map_questions();
};

const drop = async (id) => _$.map_question(id, (v) => {
  state.raw.deleteById(v);
});

const loadTemplates = async () => {
  state.templates = await $.maps();
};

const dropTemplate = async (id) => _$.map(id, (v) => {
  state.templates.deleteById(v);
});

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  loadTemplates,
  dropTemplate,
  t_options: computed(() => state.templates.map(({ id, title }) => ({
    value: id,
    label: title,
  }))),
};
