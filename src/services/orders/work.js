import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import RawForm from '@/Partials/orders/form/Raw/Work.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import save from '~/helpers/save';
import $ from '~/helpers/fetch.js';
import store from '~/store/orders/work';
import useAppRouter from '~/composables/useAppRouter';
import { setOrder } from '~/services/orders/form';

const toaster = useToast();

const { add } = store;

let work;

const setForm = (payload = {}) => {
  work.id = payload?.id;
  work.name = payload?.name;
  work.comments = payload?.comments;
  work.time = payload?.time;
  work.sum = payload?.sum;
  work.order_id = payload?.order?.id;
  work.user_id = payload?.user?.id;
};

const saveForm = async (order_id) => {
  const { message, success, data } = await save.work(work);

  try {
    return { message, success };
  } finally {
    if (success) {
      add(data.work);
      await setOrder(order_id);
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
            user_id: '',
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
