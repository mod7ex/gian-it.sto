import { CheckIcon, ExclamationIcon } from '@heroicons/vue/outline';

import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { minLength, required, helpers } from '@vuelidate/validators';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';

const roleTitle = ref('');

const permissions = ref({});

const rawRolePermissions = ref([]);

export default function roleForm() {
  const { axiosInstance } = useApi();
  const { showToast } = useToast();

  const route = useRoute();
  const router = useRouter();

  // page is used for edit and create users
  const isEditRolePage = computed(() => route.name === 'EditRole');

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

    let wasRoleCreated = false;
    let responseMessage = null;

    // send data to server
    try {
      const { data } = await axiosInstance[
        isEditRolePage.value ? 'put' : 'post'
      ](`/roles/${isEditRolePage.value ? route.params.id : ''}`, {
        title: roleTitle.value,
        permissions: Object.keys(permissions.value).filter(
          (key) => permissions.value[key],
        ),
      });

      if (!data.success) throw new Error();

      responseMessage = 'Роль успешно создана';
      wasRoleCreated = true;
    } catch (e) {
      if (e.response) {
        console.error('Error responce', e, e.response.data);
        responseMessage = e.response.data.message;
      } else if (e.request) {
        console.log('Error request', e.request);
        responseMessage = 'Не удалось создать роль!';
      } else {
        console.log('Error local', e.message);
        responseMessage = e.message;
      }

      wasRoleCreated = false;
    } finally {
      const [color, icon] = wasRoleCreated
        ? ['green', CheckIcon]
        : ['red', ExclamationIcon];
      showToast(responseMessage, color, icon);
    }
  };

  /* ************ Role Raw Permissions ************ */

  const fetchRawRolePermissions = async () => {
    try {
      const { data } = await axiosInstance.get('/permissions');

      if (!data.success) throw new Error();

      rawRolePermissions.value = data.permissions;
      rawRolePermissions.value.sort(
        (a, b) => b.permissions?.length - a.permissions?.length,
      );
    } catch (e) {
      if (e.response) {
        console.error('Error responce', e, e.response.data);
      } else if (e.request) {
        console.log('Error request', e.request);
      } else {
        console.log('Error local', e.message);
      }
      showToast('Не удалось получить разрешения', 'red', ExclamationIcon);
    }
  };

  const fetchSubjectRole = async (id) => {
    let theFetchedRole = {};
    try {
      const { data } = await axiosInstance.get(`/roles/${id}`);
      if (!data.success) throw Error();

      theFetchedRole = data.role;
    } catch (e) {
      console.error('Error request', e);
      showToast('Не удалось получить роль', 'red', ExclamationIcon);
    }
    return theFetchedRole;
  };

  const setRoleForm = (payload) => {
    roleTitle.value = payload.title;

    if (!payload.permissions) {
      permissions.value = {};
      return;
    }

    payload.permissions.forEach((perm) => {
      permissions.value[perm.name] = true;
    });
  };

  const atMountedRoleForm = async () => {
    let payload = {};

    if (isEditRolePage.value) {
      if (!route.params.id) return router.back();
      payload = await fetchSubjectRole(route.params.id);
    }

    await fetchRawRolePermissions();

    setRoleForm(payload);
  };

  return {
    v$,
    isEditRolePage,
    saveRole,
    fetchSubjectRole,
    setRoleForm,
    atMountedRoleForm,
    permissions,
    rawRolePermissions,
    fetchRawRolePermissions,
    roleTitle,
  };
}
