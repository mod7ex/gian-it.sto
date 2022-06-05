import { computed, reactive, shallowRef } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';
import useAppRouter from '~/composables/useAppRouter.js';
import useToggles from '~/composables/useToggles.js';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';

const { toggles: permissions, setToggles, truthyTogglesArray } = useToggles();

let routeInstance;
let isEditRolePage;
let redirect;

const rawRolePermissions = shallowRef([]);

const role = reactive({
  id: '',
  title: '',
});

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

  const { data, success } = await save.role({ ...role, permissions: truthyTogglesArray.value }, null, true);

  success && !isEditRolePage.value && await redirect({ name: 'EditRole', params: { id: data?.role?.id } });

  return success;
};

/* ************ Role Raw Permissions ************ */
const fetchRawRolePermissions = async () => {
  const arr = await $.permissions();

  rawRolePermissions.value = arr.sort((a, b) => b.permissions?.length - a.permissions?.length);
};

const setRoleForm = async (payload) => {
  role.title = payload?.title;
  role.id = payload?.id;

  setToggles(payload?.permissions, true, 'name');
};

const atMountedRoleForm = async () => {
  const payload = (isEditRolePage.value && routeInstance.params.id) && await $.role(routeInstance.params.id);

  await setRoleForm(payload || {});

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
    role,
    atMountedRoleForm,
  };
}
