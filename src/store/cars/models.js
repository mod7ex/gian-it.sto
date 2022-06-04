import { reactive, readonly } from 'vue';
import $ from '~/helpers/fetch.js';
import useApi from '~/composables/useApi.js';
import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud car models');
const { apiRequest } = useApi();

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async () => {
  if (!hasCRUD) return;
  state.raw = await $.car_models();
};

const drop = async (id) => {
  const { call, errorMsg, success } = apiRequest(`car-models/${id}`, { method: 'delete' });

  await call();

  success.value && state.raw.deleteById(id);

  const deletionMsg = success.value ? 'модель автомобиля успешно удален' : (errorMsg.value ?? 'Не удалось удалить модель автомобиля !');

  return { message: deletionMsg, success: success.value };
};

const getMarkModels = (markId) => {
  if (markId) {
    return state.raw.filter(({ car_mark }) => car_mark?.id === Number(markId));
  }
  return state.raw;
};

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  getMarkModels,
};
