import { computed, reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import useApi from '~/composables/useApi.js';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud car marks');
const { apiRequest } = useApi();

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  if (!hasCRUD) return;
  state.raw = await $.car_marks();
};

const drop = async (id) => {
  const { call, errorMsg, success } = apiRequest(`car-marks/${id}`, { method: 'delete' });

  await call();

  success.value && state.raw.deleteById(id);

  const deletionMsg = success.value ? 'Марка автомобиля успешно удален' : (errorMsg.value ?? 'Не удалось удалить Марка автомобиля !');

  return { message: deletionMsg, success: success.value };
};

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  options: computed(() => state.raw.map(({ id, name }) => ({
    value: id,
    label: name,
  }))),
};
