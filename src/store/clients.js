import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { alphaGroupper } from '~/helpers';

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
});

const sort = (v) => {
  state.raw.sort(v);
};

const reset = () => {
  state.raw = [];
  state.pages = 100;
  state.page = 1;
};

const load = async (payload) => {
  state.raw = await $.clients(payload);
  state.loading = false;
};

const fill = async (payload) => {
  if (state.page > state.pages) return;
  const data = await $({ key: 'clients', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.clients ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
};

const drop = async (id) => _$.client(id, (v) => {
  state.raw.deleteById(v);
});

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  sort,
  fill,

  count: computed(() => state.raw.length),

  options: computed(() => state.raw.map((item) => ({
    value: item.id,
    label: `${item.name} ${item.surname}`,
  }))),

  directory: computed(() => alphaGroupper(state.raw, 'surname', ({ id, name, surname, avatar }) => ({
    id,
    title: `${name ?? ''} ${surname ?? ''}`,
    image: `${avatar ?? ''}`,
  }))),
};
