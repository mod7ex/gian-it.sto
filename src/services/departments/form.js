import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import RawForm from '~/components/Partials/departments/Form.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import store from '~/store/departments';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';

const { load } = store;

const toaster = useToast();

let department;

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
      toaster.success(message);
    }
  }
};

const atMountedDepartmentForm = async () => {
  const { id } = department;

  if (id) {
    const dep = await $.department(id);
    setForm(dep || {});
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!department.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].department),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          department = reactive({
            id: id ?? '',
            name: '',
          });
        },
      });

      render(...args);

      onScopeDispose(() => {
        department = undefined;
      });
    });
  };

  return {
    saveForm,
    department,
    atMountedDepartmentForm,
    render: modalUp,
  };
}
