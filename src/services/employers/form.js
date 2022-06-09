import { reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import employerFormValidationsRules from '~/validationsRules/employerForm.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';
import useAvatar from '~/composables/useAvatar.js';
import useToggles from '~/composables/useToggles.js';
import $ from '~/helpers/fetch.js';
import { hyphenatedDateFormat } from '~/helpers';
import useAuth from '~/composables/useAuth.js';
import { userHasPermission } from '~/lib/permissions.js';
import store from '~/store/employees.js';
import departmentStore from '~/store/departments';
import save from '~/helpers/save';

const { current, setCurrent } = departmentStore;

const { select } = store;

const { userDepartment } = useAuth();

const hasCRUDdepartments = userHasPermission('crud departments');

let routeInstance;
let isEditEmployerPage;
let redirectBack;
let v$;

const previousPage = async (id) => {
  if (id) select(id);
  await redirectBack();
};

const { apiRequest } = useApi();
const toaster = useToast();
const { avatar, isUploadingAvatar, isValideAvatarFileSize, log, setAvatar, updateAvatar } = useAvatar();
const { toggles, setToggles, bitwisedToggles } = useToggles();

const defaultUserFields = {
  id: '',
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

  const userData = { ...form, ...bitwisedToggles.value };

  const { data } = await save.user(userData, null, true);

  return data?.user;
};

const saveUser = async () => {
  let isValideForm = await v$.value.$validate();

  isValideForm &&= isValideAvatarFileSize.value;

  if (!isValideForm) return;

  v$.value.$reset();

  let success;

  // ********* Form request
  const user = await saveRawUserFields();
  success = !!user;

  if (!success) return;

  // ********* Avatar request
  success = await updateAvatar(`/users/${user?.id}/avatar`);

  // ********* Password update request
  if (isEditEmployerPage.value && userFields.password) { success = await updatePassword(user?.id); }

  if (user?.department?.id) setCurrent(user?.department?.id);

  success && await previousPage(user?.id);
};

const setUserField = function (key) {
  if (key === 'department_id') {
    if (!hasCRUDdepartments) userFields.department_id = userDepartment.value;
    else userFields.department_id = this.department?.id ?? current.value;
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

  const { is_about_visible, is_born_at_visible, is_active } = payload;
  setToggles({ is_about_visible, is_born_at_visible, is_active });

  if (!userFields.born_at) return;

  userFields.born_at = hyphenatedDateFormat(userFields.born_at);
};

const atMountedEmployerForm = async () => {
  const employer = (isEditEmployerPage.value && routeInstance.params.id) && await $.user(routeInstance.params.id);

  await setEmployerForm(employer || {});
};

export default function () {
  const { route, isThePage, back } = useAppRouter('EditEmployer');

  [routeInstance, isEditEmployerPage, redirectBack] = [route, isThePage, back];

  const { rules } = employerFormValidationsRules(userFields, isEditEmployerPage.value);

  v$ = useVuelidate(rules, userFields, { $lazy: true });

  return {
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
