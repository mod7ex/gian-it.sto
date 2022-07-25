import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import RawForm from '@/Partials/orders/form/Raw/Work.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import store from '~/store/orders/work';
import useAppRouter from '~/composables/useAppRouter';

const toaster = useToast();

const { load } = store;

let work;

const setForm = (payload = {}) => {
  work.id = payload?.id;
  work.client_id = payload?.client?.id;
  work.payment_method = payload?.payment_method;
  work.comment = payload?.comment;
};

const saveForm = async (order_id) => {
  const { message, success } = await save.work(work);

  try {
    return { message, success };
  } finally {
    if (success) {
      await load({ order_id });
      toaster.success(message);
    }
  }
};

const atMounted = async () => {
  const { id } = work;

  if (id) {
    const dep = await $.work(id);
    setForm(dep || {});
  }
};

export default function () {
  const { route } = useAppRouter();

  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!work.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].work),
        RawForm,
        atSubmit: () => saveForm(route.params.id),
        atClose: () => scope.stop(),
        atOpen: (id) => {
          work = reactive({
            id: id ?? '',
            name: '',
            order_id: route.params.id,
            comments: '',
            sum: '',
            time: '',
          });
        },
      });

      render(...args);

      onScopeDispose(() => { work = undefined; });
    });
  };

  return {
    saveForm,
    work,
    atMounted,
    render: modalUp,
  };
}
