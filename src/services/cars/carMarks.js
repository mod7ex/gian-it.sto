import { ref } from 'vue';
import useApi from '~/composables/useApi.js';
import { $carMarks } from '~/helpers/fetch.js';

import { userHasPermission } from '~/lib/permissions.js';

const hasCRUD = userHasPermission('crud car marks');

const { apiRequest } = useApi();

const rawCarMarks = ref([]);

const fetchCarMarks = async () => {
  if (!hasCRUD) return;
  rawCarMarks.value = await $carMarks();
};

/* ************ Delete car-mark ************ */

const dropCarMark = async (id) => {
  const { call, errorMsg, success } = apiRequest(`car-marks/${id}`, { method: 'delete' });

  await call();

  success.value && rawCarMarks.value.deleteById(id);

  const deletionMsg = success.value ? 'Марка автомобиля успешно удален' : (errorMsg.value ?? 'Не удалось удалить Марка автомобиля !');

  return { message: deletionMsg, success: success.value };
};

export default function carMarksService() {
  return {
    rawCarMarks,
    fetchCarMarks,
    dropCarMark,
    hasCRUD,
  };
}
