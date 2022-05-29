import { ref, computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import employerFormValidationsRules from '~/validationsRules/employerForm.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';
import useAvatar from '~/composables/useAvatar.js';
import useToggles from '~/composables/useToggles.js';
import employers from '~/services/employers/employers';
import { $roles, $departments, $employer } from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import useAuth from '~/composables/useAuth.js';
import { userHasPermission } from '~/lib/permissions.js';

const { userDepartment } = useAuth();

const hasCRUDdepartments = userHasPermission('crud departments');

let routeInstance;
let isEditEmployerPage;
let redirectBack;
let v$;

const { setSelectedUser } = employers();

const previousPage = async (id) => {
  if (id) setSelectedUser(id);
  await redirectBack();
};

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

const userFields = reactive(defaultUserFields);

/* ************ Departments & Roles ************ */
const rawRoles = ref([]);
const rawDepartments = ref([]);

const departmentOptions = computed(() => rawDepartments.value.map((department) => ({
  value: department.id,
  label: department.name,
})));

const roleOptions = computed(() => rawRoles.value.map((role) => ({
  value: role.id,
  label: role.title,
})));

/* ************ User form ************ */
const updatePassword = async (id) => {
  const { call, errorMsg, success } = apiRequest(`/users/${id}/password`, {
    method: 'put',
    data: { password: userFields.password },
  });

  await call();

  if (success.value) {
    userFields.password = null; // empty form
    userFields.password_confirmation = null; // empty form
    toaster.success('пароль успешно обновлен');
  } else toaster.danger(errorMsg.value ?? 'Что-то пошло не так, не удалось обновить пароль !');

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

  if (success.value) toaster.success('Данные сотрудника успешно сохранены');
  else toaster.danger(errorMsg.value ?? 'Что-то пошло не так, Не удалось сохранить данные сотрудника !');

  return data.value?.user?.id;
};

const saveUser = async () => {
  let isValideForm = await v$.value.$validate();

  isValideForm &&= isValideAvatarFileSize.value;

  if (!isValideForm) return;

  v$.value.$reset();

  let success;

  // ********* Form request
  const userId = await saveRawUserFields();
  success = !!userId;

  if (!success) return;

  // ********* Avatar request
  success = await updateAvatar(`/users/${userId}/avatar`);

  // ********* Password update request
  if (isEditEmployerPage.value && userFields.password) { success = await updatePassword(userId); }

  await previousPage(userId);

  return success;
};

const setUserField = function (key) {
  if (key === 'department_id') {
    if (!hasCRUDdepartments) userFields.department_id = userDepartment.value;
    else userFields.department_id = this.department?.id ?? '';
    return;
  }

  if (key === 'role_id') {
    userFields.role_id = Array.isArray(this.roles) ? this.roles[0]?.id : '';
    return;
  }

  userFields[key] = this[key] ?? '';
};

const setEmployerForm = async (payload) => {
  setAvatar(payload);

  Object.keys(userFields).forEach(setUserField, payload);

  // eslint-disable-next-line camelcase
  const { is_about_visible, is_born_at_visible, is_active } = payload;
  setToggles({ is_about_visible, is_born_at_visible, is_active });

  if (!userFields.born_at) return;

  userFields.born_at = hyphenatedDateFormat(userFields.born_at);
};

const atMountedEmployerForm = async () => {
  const employer = (isEditEmployerPage.value && routeInstance.params.id) && await $employer(routeInstance.params.id);

  await setEmployerForm(employer || {});

  if (hasCRUDdepartments)rawDepartments.value = await $departments();

  rawRoles.value = await $roles();
};

export default function employerFormService() {
  const { route, isThePage, back } = useAppRouter('EditEmployer');

  [routeInstance, isEditEmployerPage, redirectBack] = [route, isThePage, back];

  const { rules } = employerFormValidationsRules(userFields, isEditEmployerPage.value);

  v$ = useVuelidate(rules, userFields, { $lazy: true });

  return {
    roles: rawRoles,
    departments: rawDepartments,
    departmentOptions,
    roleOptions,
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
    previousPage,
  };
}
