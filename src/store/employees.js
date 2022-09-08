import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import _$ from '~/helpers/drop';
import { alphaGroupper } from '~/helpers';
import { userHasAtLeastOnePermission } from '~/lib/permissions';

const canRead = userHasAtLeastOnePermission(['read users', 'crud users']);

const state = reactive({
  employees: [],
  selectedId: undefined,
  loading: false,
});

const select = (id) => {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);
  state.selectedId = Number.isNaN(id) ? undefined : id;
};

const sort = (v) => {
  state.employees.sort(v);
};

const reset = () => {
  state.employees = [];
  state.selectedId = undefined;
  state.loading = false;
};

const load = async (payload) => {
  if (!canRead) return;
  state.loading = true;
  state.employees = await $.users(payload);
  state.loading = false;
};

const drop = async (id) => _$.user(id, (v) => {
  state.employees.deleteById(v) && select();
});

const selectedUser = computed(() => (state.selectedId ? state.employees.find(({ id }) => id === state.selectedId) ?? {} : {}));

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  sort,
  select,
  selectedUser,
  options: computed(() => state.employees.map(({ id: value, name, middle_name }) => ({ label: `${name ?? ''} ${middle_name ?? ''}`, value }))),
  count: computed(() => state.employees.length),
  selected: computed(() => !!(selectedUser.value.id)),
  directory: computed(() => alphaGroupper(state.employees, 'middle_name', ({ id, name, middle_name, office_position: op, avatar }) => ({
    id,
    title: `${name ?? ''} ${middle_name ?? ''}`,
    subtitle: `${op ?? ''}`,
    image: `${avatar ?? ''}`,
  }))),
};
