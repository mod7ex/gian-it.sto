import { ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $carModels } from '~/helpers/fetch.js';

import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud car models');

const { apiRequest } = useApi();

const rawCarModels = ref([]);

const fetchCarModels = async () => {
  if (!hasCRUD) return;
  rawCarModels.value = await $carModels();
};

/* ************ Delete car-model ************ */

const dropCarModel = async (id) => {
  const { call, errorMsg, success } = apiRequest(`car-models/${id}`, { method: 'delete' });

  await call();

  success.value && rawCarModels.value.deleteById(id);

  const deletionMsg = success.value ? 'модель автомобиля успешно удален' : (errorMsg.value ?? 'Не удалось удалить модель автомобиля !');

  return { message: deletionMsg, success: success.value };
};

export default function carModelsService() {
  return {
    rawCarModels,
    fetchCarModels,
    dropCarModel,
    hasCRUD,
  };
}
