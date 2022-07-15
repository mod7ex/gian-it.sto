import { computed, reactive, shallowRef, effectScope } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';
import useAppRouter from '~/composables/useAppRouter.js';
import useToggles from '~/composables/useToggles.js';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';

let rawRolePermissions;
let role;

/* ************ Role Raw Permissions ************ */
const fetchRawRolePermissions = async () => {
  const arr = await $.permissions();

  rawRolePermissions.value = arr.sort((a, b) => b.permissions?.length - a.permissions?.length);
};

export default () => effectScope().run(() => {
  const { route, isThePage, redirectTo } = useAppRouter('EditRole');

  const { toggles: permissions, setToggles, truthyTogglesArray } = useToggles();

  const setRoleForm = async (payload) => {
    role.title = payload?.title;
    role.id = payload?.id;

    setToggles(payload?.permissions, true, 'name');
  };

  const atMountedRoleForm = async () => {
    const payload = (isThePage.value && route.params.id) && await $.role(route.params.id);

    await setRoleForm(payload || {});

    await fetchRawRolePermissions();
  };

  if (!role) {
    role = reactive({
      id: '',
      title: '',
    });

    rawRolePermissions = shallowRef([]);
  }

  /* ************ Role[Title + Permissions] (create & update) ************ */

  const rules = computed(() => ({
    title: {
      required: helpers.withMessage('Укажите Название', required),
      minLength: helpers.withMessage('не менее 5 символов', minLength(5)),
    },
  }));

  const v$ = useVuelidate(rules, role, { $lazy: true });

  const saveRole = async () => {
    const isValideRoleName = await v$.value.$validate();

    if (!isValideRoleName) return;

    v$.value.$reset();

    const { success } = await save.role({ ...role, permissions: truthyTogglesArray.value }, null, true);

    success && await redirectTo({ name: 'Roles' });

    return success;
  };

  return {
    isEditRolePage: isThePage,
    v$,
    saveRole,
    setRoleForm,
    permissions,
    rawRolePermissions,
    fetchRawRolePermissions,
    role,
    atMountedRoleForm,
  };
});
