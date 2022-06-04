import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import useApi from '~/composables/useApi.js';
import { alphaGroupper } from '~/helpers';

const { apiRequest } = useApi();

const state = reactive({
  clients: [],
  selectedId: undefined,
  loading: false,
});

const select = (id) => {
  // eslint-disable-next-line no-param-reassign
  id = Number(id);
  state.selectedId = Number.isNaN(id) ? undefined : id;
};

const sort = (v) => {
  state.clients.sort(v);
};

const reset = () => {
  state.clients = [];
  state.selectedId = undefined;
  state.loading = false;
};

const load = async (payload) => {
  state.loading = true;
  state.clients = await $.clients(payload);
  state.loading = false;
};

const drop = async (id) => {
  const { call, errorMsg, success } = apiRequest(`clients/${id}`, { method: 'delete' });

  await call();

  success.value && state.clients.deleteById(id) && select();

  const deletionMsg = success.value ? 'Сотрудник успешно удален' : (errorMsg.value ?? 'Не удалось удалить пользователя');

  return { message: deletionMsg, success: success.value };
};

const selectedUser = computed(() => (state.selectedId ? state.clients.find(({ id }) => id === state.selectedId) ?? {} : {}));

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  sort,
  select,

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
