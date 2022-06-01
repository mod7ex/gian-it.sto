import { computed, reactive, readonly } from 'vue';
import { $cars } from '~/helpers/fetch.js';
import useApi from '~/composables/useApi.js';
import { userHasAtLeastOnePermission } from '~/lib/permissions.js';

const hasPermission = userHasAtLeastOnePermission(['crud cars', 'crud car marks', 'crud fuels', 'crud engine volumes', 'crud car models']);
const { apiRequest } = useApi();

const state = reactive({
  raw: [],
});

const reset = () => {
  state.raw = [];
};

const load = async (payload = {}) => {
  if (!hasPermission) return;
  state.raw = await $cars(payload);
};

const drop = async (id) => {
  const { call, errorMsg, success } = apiRequest(`cars/${id}`, { method: 'delete' });

  await call();

  success.value && state.raw.deleteById(id);

  const deletionMsg = success.value ? 'Автомобили успешно удален' : (errorMsg.value ?? 'Не удалось удалить Автомобили !');

  return { message: deletionMsg, success: success.value };
};

const extractor = ({ id, car_model, vin, number, client }) => ({ id, car_model: car_model?.name, vin, number, client: { name: `${client?.name} ${client?.surname}`, id: client?.id } });

export default {
  state: readonly(state),
  reset,
  load,
  drop,
  cars: computed(() => state.raw.map(extractor)),
};
