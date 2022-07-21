import { computed, reactive, effectScope, onScopeDispose, ref } from 'vue';
import RawForm from '@/Partials/orders/form/Raw/Work.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';

// import useToast from '~/composables/useToast.js';
// import save from '~/helpers/save';
// import $ from '~/helpers/fetch.js';

// const toaster = useToast();

let work;
let works;

const setForm = (payload = {}) => {
  work.id = payload?.id;
  work.client_id = payload?.client?.id;
  work.payment_method = payload?.payment_method;
  work.comment = payload?.comment;
};

const saveForm = async () => {
  works.value.push(work);
  return { message: 'shit', success: true };

  // const { message, success } = await save.department(department);

  // try {
  //   return { message, success };
  // } finally {
  //   if (success) {
  //     await load();
  //     toaster.success(message);
  //   }
  // }
};

const atMounted = async () => {
  const { id } = work;

  if (id) {
    // const dep = await $.department(id);
    // setForm(dep || {});
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!work.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].work),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          works = ref([]);

          work = reactive({
            id: id ?? '',
          });
        },
      });

      render(...args);

      // onScopeDispose(() => { work = undefined; });
    });
  };

  return {
    saveForm,
    work,
    atMounted,
    render: modalUp,
    works,
  };
}
