import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { alphaGroupper } from '~/helpers';
import { userHasAtLeastOnePermission } from '~/lib/permissions';

const canRead = userHasAtLeastOnePermission(['read clients', 'crud clients']);

const state = reactive({
  raw: [],
  pages: undefined,
  page: 1,
  pending: false,
});

const sort = (v) => {
  state.raw.sort(v);
};

const reset = () => {
  state.raw = [];
  state.pages = undefined;
  state.page = 1;
};

const load = async (payload) => {
  if (!canRead) return;
  state.raw = await $.clients(payload);
  state.loading = false;
};

const fill = async (payload) => {
  if (state.pending) return;
  if (!canRead) return;
  if (state.page > state.pages) return;
  state.pending = true;
  const data = await $({ key: 'clients', params: { ...payload, page: state.page } });
  state.raw = state.raw.concat(data?.clients ?? []);
  state.pages = data?.meta?.last_page ?? 100;
  state.page += 1;
  state.pending = false;
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
  directory: computed(() => alphaGroupper(state.raw, 'surname', ({ id, name, middle_name, avatar }) => ({
    id,
    title: `${name ?? ''} ${middle_name ?? ''}`,
    image: `${avatar ?? ''}`,
  }))),
};
