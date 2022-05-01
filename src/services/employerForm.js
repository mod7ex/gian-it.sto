import { ref, computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import employerFormValidationsRules from '~/validationsRules/employerForm.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';
import useAvatar from '~/composables/useAvatar.js';
import useToggles from '~/composables/useToggles.js';

let routeInstance;
let isEditEmployerPage;
let redirect;
let v$;

const { apiRequest } = useApi();
const toaster = useToast();
const { avatar, isUploadingAvatar, isValideAvatarFileSize, log, setAvatar, updateAvatar } = useAvatar();
const { toggles, setToggles, bitwisedToggles } = useToggles();

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

const roles = ref([]);
const departments = ref([]);

const userFields = reactive(defaultUserFields);

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
  const { call, data, errorMsg, success } = apiRequest('/departments');

  await call();

  departments.value = data.value?.departments || [];

  !success.value && toaster.danger(errorMsg.value ?? 'Не удалось получить отделы');
};

const fetchRoles = async () => {
  const { call, data, errorMsg, success } = apiRequest('/roles');

  await call();

  roles.value = data.value?.roles || [];

  !success.value && toaster.danger(errorMsg.value ?? 'Не удалось получить роли');
};

/* ************ User form ************ */
const updatePassword = async (id) => {
  const { call, errorMsg, success } = apiRequest(`/users/${id}/password`, {
    method: 'put',
    data: { password: userFields.password },
  });

  await call();

  if (success.value) {
    userFields.password = null;
    userFields.password_confirmation = null;
    toaster.success('пароль успешно обновлен');
  } else toaster.danger(errorMsg.value ?? 'Что-то пошло не так, не удалось обновить пароль');

  return success.value;
};

const saveRawUserFields = async () => {
  const form = {};

  Object.keys(userFields).forEach((key) => {
    // won't count password in case we're editing the user, password is updated siparatly (down)
    if (isEditEmployerPage.value && key.substr(0, 8) === 'password') return;
    form[key] = `${userFields[key]}`;
  });

  const { call, data, errorMsg, success } = apiRequest(`/users/${isEditEmployerPage.value ? routeInstance.params.id : ''}`, {
    method: isEditEmployerPage.value ? 'put' : 'post',
    data: { ...form, ...bitwisedToggles.value },
  });

  await call();

  if (success.value) toaster.success('ваши данные успешно сохранены');
  else toaster.danger(errorMsg.value ?? 'не удалось сохранить ваши данные');

  return data.value?.user?.id;
};

const saveUser = async () => {
  let isValideForm = await v$.value.$validate();

  isValideForm = isValideAvatarFileSize.value && isValideForm;

  if (!isValideForm) return;

  v$.value.$reset();

  let successResponce;

  // ********* Form request
  const userId = await saveRawUserFields();
  successResponce = !!userId;

  if (!successResponce) return;

  // ********* Avatar request
  successResponce = await updateAvatar(`/users/${userId}/avatar`);

  // ********* Password update request
  if (isEditEmployerPage.value && userFields.password) { successResponce = await updatePassword(userId); }

  await redirect({ name: 'EditEmployer', params: { id: userId } });

  return successResponce;
};

const setEmployerForm = async (payload) => {
  setAvatar(payload);

  Object.keys(userFields).forEach((key) => {
    if (key === 'department_id') {
      userFields.department_id = payload.department?.id ?? '';
      return;
    }

    if (key === 'role_id') {
      // console.log(payload.roles); // array
      // userFields.role_id = payload.role?.id; // ===========> should be fixed later
      userFields.role_id = Array.isArray(payload.roles) ? payload.roles[0]?.id : '';
      return;
    }

    userFields[key] = payload[key] ?? '';
  });

  // eslint-disable-next-line camelcase
  const { is_about_visible, is_born_at_visible, is_active } = payload;
  setToggles({ is_about_visible, is_born_at_visible, is_active });

  if (!userFields.born_at) return;

  const [d, m, y] = userFields.born_at.split('.');
  userFields.born_at = `${y}-${m}-${d}`;
};

const fetchSubjectUser = async (id) => {
  const { call, data, errorMsg, success } = apiRequest(`/users/${id}`);

  await call();

  !success.value && toaster.success(errorMsg.value ?? 'Не удалось получить пользователя');

  return data.value.user;
};

const atMountedEmployerForm = async () => {
  const employer = (isEditEmployerPage.value && routeInstance.params.id) && await fetchSubjectUser(routeInstance.params.id);

  await setEmployerForm(employer || {});

  await fetchDepartments();
  await fetchRoles();
};

export default function employerFormService() {
  const { route, isThePage, redirectTo } = useAppRouter('EditEmployer');

  [routeInstance, isEditEmployerPage, redirect] = [route, isThePage, redirectTo];

  const { rules } = employerFormValidationsRules(userFields, isEditEmployerPage.value);

  v$ = useVuelidate(rules, userFields, { $lazy: true });

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
    avatar,
    userFields,
    isEditEmployerPage,
    v$,
    saveUser,
    toggles,
    setEmployerForm,
    atMountedEmployerForm,
    isUploadingAvatar,
  };
}
