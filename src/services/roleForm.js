import { CheckIcon, ExclamationIcon } from '@heroicons/vue/outline';
import { computed, ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';

const rawRolePermissions = ref([]);

const roleTitle = ref('');
const permissions = ref({});

export default function roleForm() {
  const { apiRequest } = useApi();
  const { showToast } = useToast();

  const { route, isThePage, redirectTo } = useAppRouter('EditRole');

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

    const { call, data, errorMsg, success } = apiRequest(`/roles/${isThePage.value ? route.params.id : ''}`, {
      method: isThePage.value ? 'put' : 'post',
      data: {
        title: roleTitle.value,
        permissions: Object.keys(permissions.value).filter(
          (key) => permissions.value[key],
        ),
      },
    });

    await call();

    if (!success.value) return showToast(errorMsg.value ?? 'Something went wrong!', 'red', ExclamationIcon);

    await redirectTo({ name: 'EditRole', params: { id: data.value?.role?.id } });

    return showToast('Role saved.', 'green', CheckIcon);
  };

  /* ************ Role Raw Permissions ************ */
  const fetchRawRolePermissions = async () => {
    const { call, data, errorMsg, success } = apiRequest('/permissions');

    await call();

    if (!success.value) return showToast(errorMsg.value ?? 'Не удалось получить разрешения', 'red', ExclamationIcon);

    rawRolePermissions.value = data.value?.permissions || [];
    rawRolePermissions.value.sort(
      (a, b) => b.permissions?.length - a.permissions?.length,
    );
  };

  const fetchSubjectRole = async (id) => {
    const { call, data, errorMsg, success } = apiRequest(`/roles/${id}`);

    await call();

    !success.value && showToast(errorMsg.value ?? 'Не удалось получить роль', 'red', ExclamationIcon);

    return data.value.role || {};
  };

  const setRoleForm = async (payload) => {
    roleTitle.value = payload?.title;
    permissions.value = {};

    (payload?.permissions ?? []).forEach((perm) => {
      permissions.value[perm.name] = true;
    });
  };

  const atMountedRoleForm = async () => {
    const role = (isThePage.value && route.params.id) && await fetchSubjectRole(route.params.id);

    await setRoleForm(role || null);

    await fetchRawRolePermissions();
  };

  return {
    isEditRolePage: isThePage,
    v$,
    saveRole,
    fetchSubjectRole,
    setRoleForm,
    permissions,
    rawRolePermissions,
    fetchRawRolePermissions,
    roleTitle,
    atMountedRoleForm,
  };
}
