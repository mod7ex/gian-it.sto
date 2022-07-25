import { computed, reactive, effectScope, onScopeDispose } from 'vue';
import RawForm from '~/components/Partials/orders/form/Raw/Template.vue';
import communicate from '~/helpers/communicate';
import useModalForm from '~/composables/useModalForm';
import useToast from '~/composables/useToast.js';
import save from '~/helpers/save';
import $ from '~/helpers/fetch';
import { getFileContent } from '~/helpers';
import store from '~/store/orders/documents';

const toaster = useToast();

const { loadTemplates } = store;

let template;

const setForm = (payload = {}) => {
  template.id = payload.id;
  template.name = payload.name;
};

const saveForm = async () => {
  const { message, success } = await save.document_template(template);

  try {
    return { message, success };
  } finally {
    if (success) {
      toaster.success(message);
      await loadTemplates();
    }
  }
};

const log = (e) => {
  getFileContent(e.target.files[0], (v) => { template.template = v; }, () => {
    template.template = undefined; // for now just clear template
  });
};

const atMounted = async () => {
  const { id } = template;

  if (id) {
    const dep = await $.template(id);
    setForm(dep || {});
  }
};

export default function () {
  const modalUp = (...args) => {
    const scope = effectScope();

    scope.run(() => {
      const isUpdate = computed(() => !!template.id);

      const { render } = useModalForm({
        title: computed(() => communicate.modal[isUpdate.value ? 'update' : 'create'].template),
        RawForm,
        atSubmit: saveForm,
        atClose: () => scope.stop(),
        atOpen: (id) => {
          template = reactive({
            id: id ?? '',
            name: '',
            template: '',
          });
        },
      });

      render(...args);

      onScopeDispose(() => {
        template = undefined;
      });
    });
  };

  return {
    saveForm,
    template,
    render: modalUp,
    atMounted,
    log,
  };
}
