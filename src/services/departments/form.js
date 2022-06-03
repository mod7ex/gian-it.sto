import { computed, reactive } from 'vue';
import useApi from '~/composables/useApi.js';
import { $department } from '~/helpers/fetch.js';
import useToast from '~/composables/useToast.js';
import store from '~/store/departments';
import RawForm from '~/components/Partials/departments/Form.vue';

import useModalForm from '~/composables/useModalForm';

const { load } = store;

const toaster = useToast();

const { apiRequest } = useApi();

const department = reactive({
  name: '',
  id: '',
});

const isUpdate = computed(() => !!department.id);

const setForm = (payload = {}) => {
  department.id = payload.id;
  department.name = payload.name;
};

const saveForm = async () => {
  const { call, errorMsg, success } = apiRequest();

  await call(`/departments/${department.id ?? ''}`, {
    method: isUpdate.value ? 'put' : 'post',
    data: { name: department.name },
  });

  try {
    return { message: errorMsg.value, success: success.value };
  } finally {
    if (success.value) {
      await load();
      toaster.success('Отдел успешно сохранен');
    }
  }
};

const atMountedDepartmentForm = async () => {
  const { id } = department;

  let dep = {};
  if (id) dep = await $department(id);

  setForm(dep);
};

export default function () {
  const { render } = useModalForm({
    title: `${isUpdate.value ? 'Oбновляете' : 'Создайте'} отдела`,
    RawForm,
    atSubmit: saveForm,
    atOpen: (id) => setForm({ id }),
  });

  return {
    saveForm,
    department,
    atMountedDepartmentForm,
    render,
  };
}
