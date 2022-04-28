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

    const request = apiRequest(`/roles/${isThePage.value ? route.params.id : ''}`, {
      method: isThePage.value ? 'put' : 'post',
      data: {
        title: roleTitle.value,
        permissions: Object.keys(permissions.value).filter(
          (key) => permissions.value[key],
        ),
      },
    });

    await request.fetch();

    const successResponce = !request.error.value && request.data.value?.success;

    !successResponce && showToast(request.errorMsg.value ?? 'Something went wrong!', 'red', ExclamationIcon);
    successResponce && showToast('Role saved.', 'green', CheckIcon);

    await redirectTo({ name: 'EditRole', params: { id: request.data.value?.role?.id } });

    return successResponce;
  };

  /* ************ Role Raw Permissions ************ */
  const fetchRawRolePermissions = async () => {
    const request = apiRequest('/permissions');

    await request.fetch();

    rawRolePermissions.value = request.data.value?.permissions || [];
    rawRolePermissions.value.sort(
      (a, b) => b.permissions?.length - a.permissions?.length,
    );

    (request.error.value || !request.data.value.success) && showToast(request.errorMsg.value ?? 'Не удалось получить разрешения', 'red', ExclamationIcon);
  };

  const fetchSubjectRole = async (id) => {
    const request = apiRequest(`/roles/${id}`);

    await request.fetch();

    (request.error.value || !request.data.value.success) && showToast(request.errorMsg.value ?? 'Не удалось получить роль', 'red', ExclamationIcon);

    return request.data.value.role || {};
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
