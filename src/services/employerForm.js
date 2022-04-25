import { ref, computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { CheckIcon, ExclamationIcon } from '@heroicons/vue/outline';
import employerFormValidationsRules from '~/validationsRules/employerForm.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';

const defaultEmployerAvatar = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

const defaultUserFields = {
  // password fields will be automatically set if we're creating a user
  name: '',
  surname: '',
  middle_name: '',
  email: '',
  phone: '',
  about: '',
  born_at: '',
  office_position: '',
  role_id: '',
  department_id: '',
};

const defaultTogglesState = [false, false, false];

const roles = ref([]);
const departments = ref([]);

let userFields = reactive(defaultUserFields);
const avatar = ref(null);
const toggles = ref(defaultTogglesState);
const avatarFile = ref(null);

export default function employerForm() {
  const { showToast } = useToast();
  const { axiosInstance } = useApi();

  const { route, isThePage } = useAppRouter('EditEmployer');

  /* ************ Avatar ************ */
  const isValideAvatarFileSize = computed(() => {
    if (!avatarFile.value) return true;
    return avatarFile.value.size < 10000000;
  });

  const log = (event) => {
    [avatarFile.value] = event.target.files;
    avatar.value = window.URL.createObjectURL(avatarFile.value);
  };

  /* ************ Fetch Departments & Roles ************ */
  const departmentOptions = computed(() => departments.value.map((department) => ({
    value: department.id,
    label: department.name,
  })));

  const roleOptions = computed(() => roles.value.map((role) => ({
    value: role.id,
    label: role.title,
  })));

  const fetchDepartments = async () => {
    try {
      const departmentRes = await axiosInstance.get('/departments');
      departments.value = departmentRes.data.departments || [];
    } catch (e) {
      console.error('Error request', e);
      showToast('Не удалось получить роли', 'red', ExclamationIcon);
    }
  };

  const fetchRoles = async () => {
    try {
      const rolesRes = await axiosInstance.get('/roles');
      roles.value = rolesRes.data.roles || [];
    } catch (e) {
      console.error('Error request', e);
      showToast('Не удалось получить отделы', 'red', ExclamationIcon);
    }
  };

  /* ************ User form ************ */

  const { rules } = employerFormValidationsRules(userFields, isThePage.value);

  const v$ = useVuelidate(rules, userFields, { $lazy: true });

  const saveUser = async () => {
    let isValideForm = await v$.value.$validate();

    isValideForm = isValideAvatarFileSize.value && isValideForm;

    if (!isValideForm) return;

    v$.value.$reset();

    let wasProfileUpdated = true;
    let responseMessage = null;

    const form = new FormData();

    Object.keys(userFields).forEach((key) => {
      // won't count password in case we're editing the user, password is updated siparatly (down)
      if (isThePage.value && key.substr(0, 8) === 'password') return;
      form.append(key, `${userFields[key]}`);
    });

    form.append('is_about_visible', toggles.value[0]);
    form.append('is_born_at_visible', toggles.value[1]);
    form.append('is_active', toggles.value[2]);

    // send data to server
    try {
      const { data } = await axiosInstance[isThePage.value ? 'put' : 'post'](
        `/users/${isThePage.value ? route.params.id : ''}`,
        // userFields
        form,
      );

      // update avatar if user uploaded a photo
      if (avatarFile.value) {
        const avatarForm = new FormData();
        avatarForm.append('avatar', avatarFile.value);

        await axiosInstance.post(`/users/${data.user.id}/avatar`, avatarForm, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // update password if filled (in case of update page)
      if (isThePage.value && userFields.password) {
        const passwordForm = new FormData();

        passwordForm.append('password', userFields.password);

        await axiosInstance.put(
          `/users/${data.user.id}/password`,
          passwordForm,
        );
      }

      // everything was updated with success
      wasProfileUpdated = true;
      responseMessage = 'профиль успешно обновлен';
    } catch (e) {
      if (e.response) {
        console.error('Error responce', e, e.response.data);

        responseMessage = e.response.data.message; // during dev
      } else if (e.request) {
        console.log('Error request', e.request);

        responseMessage = 'Не удалось обновить профиль'; // 'Undefined (network?) error'
      } else {
        console.log('Error local', e.message);

        responseMessage = e.message;
      }

      wasProfileUpdated = false;
    } finally {
      const color = wasProfileUpdated ? 'green' : 'red';
      const icon = wasProfileUpdated ? CheckIcon : ExclamationIcon;
      showToast(responseMessage, color, icon);
    }
  };

  const setEmployerForm = async (payload = {}) => {
    if (payload !== {}) {
      Object.keys(userFields).forEach((key) => {
        if (key === 'department_id') {
          userFields.department_id = payload.department?.id;
          return;
        }

        if (key === 'role_id') {
          // console.log(payload.roles); // array
          // userFields.role_id = payload.role?.id; // ===========> should be fixed later
          userFields.role_id = 2;
          return;
        }

        userFields[key] = payload[key];
      });

      if (userFields.born_at) {
        const [d, m, y] = userFields.born_at.split('.');
        userFields.born_at = `${y}-${m}-${d}`;
      }

      toggles.value = [
        payload.is_about_visible || false,
        payload.is_born_at_visible || false,
        payload.is_active || false,
      ];

      avatar.value = payload.avatar || defaultEmployerAvatar;

      return;
    }

    userFields = defaultUserFields;
    toggles.value = defaultTogglesState;
    avatarFile.value = null;
  };

  const fetchSubjectUser = async (id) => {
    let theFetchedUser = {};

    try {
      const { data } = await axiosInstance.get(`/users/${id}`);
      if (!data.success) throw Error();

      theFetchedUser = data.user;
    } catch (e) {
      console.error('Error request', e);
      showToast('Не удалось получить пользователя', 'red', ExclamationIcon);
    }

    return theFetchedUser;
  };

  return {
    roles,
    fetchSubjectUser,
    departments,
    departmentOptions,
    roleOptions,
    fetchDepartments,
    fetchRoles,
    isValideAvatarFileSize,
    log,
    avatarFile,
    avatar,
    userFields,
    isEditEmployerPage: isThePage,
    v$,
    saveUser,
    toggles,
    setEmployerForm,
  };
}
