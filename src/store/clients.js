import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { alphaGroupper } from '~/helpers';

const state = reactive({
  clients: [],
  selectedId: undefined,
  loading: false,
  pages: 100,
  page: 1,
});

const select = (id) => {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);
  state.selectedId = Number.isNaN(id) ? undefined : id;
};

const sort = (v) => {
  state.clients.sort(v);
};

const reset = (bool) => {
  state.clients = [];
  if (bool) state.selectedId = undefined;
  state.loading = false;
  state.pages = 100;
  state.page = 1;
};

const load = async (payload) => {
  state.loading = true;
  state.clients = await $.clients(payload);
  state.loading = false;
};

const fill = async (payload) => {
  if (state.page > state.pages) return;
  state.loading = true;
  const data = await $({ key: 'clients', params: { ...payload, page: state.page } });
  state.clients = state.clients.concat(data?.clients ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.loading = false;
};

const drop = async (id) => _$.client(id, (v) => {
  state.clients.deleteById(v) && select();
});

const selectedUser = computed(() => (state.selectedId ? state.clients.find(({ id }) => id === state.selectedId) ?? {} : {}));

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  sort,
  select,
  fill,

  selectedUser,

  count: computed(() => state.clients.length),

  selected: computed(() => !!(selectedUser.value.id)),

  options: computed(() => state.clients.map((item) => ({
    value: item.id,
    label: `${item.name} ${item.surname}`,
  }))),

  directory: computed(() => alphaGroupper(state.clients, 'surname', ({ id, name, surname, avatar }) => ({
    id,
    title: `${name ?? ''} ${surname ?? ''}`,
    image: `${avatar ?? ''}`,
  }))),
};
