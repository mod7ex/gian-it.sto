import { computed, reactive } from 'vue';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';
import useToast from '~/composables/useToast.js';
import store from '~/store/departments';
import RawForm from '~/components/Partials/departments/Form.vue';

import useModalForm from '~/composables/useModalForm';

const { load } = store;

const toaster = useToast();

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
  const { message, success } = await save.department(department);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load();
      toaster.success('Отдел успешно сохранен');
    }
  }
};

const atMountedDepartmentForm = async () => {
  const { id } = department;

  let dep = {};
  if (id) dep = await $.department(id);

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
