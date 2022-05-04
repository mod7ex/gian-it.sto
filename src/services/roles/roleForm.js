import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';
import useToggles from '~/composables/useToggles.js';
import { $rawPermissions, $role } from '~/helpers/fetch.js';

const { toggles: permissions, setToggles, truthyTogglesArray } = useToggles();

const toaster = useToast();

let routeInstance;
let isEditRolePage;
let redirect;

const rawRolePermissions = ref([]);

const roleTitle = ref('');

const { apiRequest } = useApi();

/* ************ Role[Title + Permissions] (create & update) ************ */

const roleTitleRules = computed(() => ({
  roleTitle: {
    required: helpers.withMessage('Укажите Название', required),
    minLength: helpers.withMessage('не менее 5 символов', minLength(5)),
  },
}));

const v$ = useVuelidate(roleTitleRules, { roleTitle }, { $lazy: true });

const saveRole = async () => {
  const isValideRoleName = await v$.value.$validate();

  if (!isValideRoleName) return;

  v$.value.$reset();

  const { call, data, errorMsg, success } = apiRequest(`/roles/${isEditRolePage.value ? routeInstance.params.id : ''}`, {
    method: isEditRolePage.value ? 'put' : 'post',
    data: {
      title: roleTitle.value,
      permissions: truthyTogglesArray.value,
    },
  });

  await call();

  if (!success.value) return toaster.danger(errorMsg.value ?? 'Something went wrong!');

  !isEditRolePage.value && await redirect({ name: 'EditRole', params: { id: data.value?.role?.id } });

  return toaster.success('Role saved.');
};

/* ************ Role Raw Permissions ************ */
const fetchRawRolePermissions = async () => {
  rawRolePermissions.value = await $rawPermissions();

  rawRolePermissions.value.sort((a, b) => b.permissions?.length - a.permissions?.length);
};

const setRoleForm = async (payload) => {
  roleTitle.value = payload?.title;

  setToggles(payload?.permissions, true, 'name');
};

const atMountedRoleForm = async () => {
  const role = (isEditRolePage.value && routeInstance.params.id) && await $role(routeInstance.params.id);

  await setRoleForm(role || {});

  await fetchRawRolePermissions();
};

export default function roleFormService() {
  const { route, isThePage, redirectTo } = useAppRouter('EditRole');

  [routeInstance, isEditRolePage, redirect] = [route, isThePage, redirectTo];

  return {
    isEditRolePage,
    v$,
    saveRole,
    setRoleForm,
    permissions,
    rawRolePermissions,
    fetchRawRolePermissions,
    roleTitle,
    atMountedRoleForm,
  };
}
