import { computed, reactive, readonly } from 'vue';
import { $roles } from '~/helpers/fetch.js';
import useApi from '~/composables/useApi.js';

const { apiRequest } = useApi();

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  state.raw = await $roles();
};

const drop = async (id) => {
  const { call, errorMsg, success } = apiRequest(`roles/${id}`, { method: 'delete' });

  await call();

  success.value && state.raw.deleteById(id);

  const deletionMsg = success.value ? 'Роль успешно удалена.' : (errorMsg.value ?? 'Не удалось удалить Роль !');

  return { message: deletionMsg, success: success.value };
};

export default {
  state: readonly(state),

  load,
  drop,
  reset,
  roles: computed(() => state.raw.map((role) => ({
    id: role.id,
    name: role.title,
    created_at: role.created_at,
  }))),

  options: computed(() => state.raw.map(({ id, title }) => ({
    value: id,
    label: title,
  }))),
};
