import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { alphaGroupper } from '~/helpers';

const state = reactive({
  raw: [],
  pages: 100,
  page: 1,
});

const select = (id) => {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);
  state.selectedId = Number.isNaN(id) ? undefined : id;
};

const sort = (v) => {
  state.raw.sort(v);
};

const reset = (bool) => {
  state.raw = [];
  if (bool) state.selectedId = undefined;
  state.loading = false;
  state.pages = 100;
  state.page = 1;
};

const load = async (payload) => {
  state.loading = true;
  state.raw = await $.clients(payload);
  state.loading = false;
};

const fill = async (payload) => {
  if (state.page > state.pages) return;
  state.loading = true;
  const data = await $({ key: 'clients', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.clients ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.loading = false;
};

const drop = async (id) => _$.client(id, (v) => {
  state.raw.deleteById(v) && select();
});

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  sort,
  select,
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
