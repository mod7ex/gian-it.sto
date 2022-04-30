import { ref, computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import employerFormValidationsRules from '~/validationsRules/employerForm.js';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';
import useAppRouter from '~/composables/useAppRouter.js';

let routeInstance;
let isEditEmployerPage;
let redirect;
let v$;

const { apiRequest } = useApi();
const toaster = useToast();

const defaultEmployerAvatar = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';
const defaultTogglesState = [false, false, false];
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

const avatarFile = ref(null);
const userFields = reactive(defaultUserFields);
const avatar = ref(defaultEmployerAvatar);
const toggles = ref(defaultTogglesState);

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
const isUploadingAvatar = ref(false);
const updateAvatar = async (id) => {
  if (!avatarFile.value) return true;

  isUploadingAvatar.value = true;

  const form = new FormData();
  form.append('avatar', avatarFile.value);

  const { call, errorMsg, success } = apiRequest(`/users/${id}/avatar`, {
    method: 'post',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  await call();

  isUploadingAvatar.value = false;

  !success.value && toaster.danger(errorMsg.value ?? "Something went wrong , avatar couldn't be set");

  return success.value;
};

const updatePassword = async (id) => {
  const form = new FormData();

  form.append('password', userFields.password);

  const { call, errorMsg, success } = apiRequest(`/users/${id}/password`, {
    method: 'put',
    data: form,
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  await call();

  !success.value && toaster.danger(errorMsg.value ?? "Something went wrong , password couldn't be updated");

  return success.value;
};

const saveRawUserFields = async () => {
  const form = new FormData();

  Object.keys(userFields).forEach((key) => {
    // won't count password in case we're editing the user, password is updated siparatly (down)
    if (isEditEmployerPage.value && key.substr(0, 8) === 'password') return;
    form.append(key, `${userFields[key]}`);
  });

  form.append('is_about_visible', toggles.value[0] ? 1 : 0);
  form.append('is_born_at_visible', toggles.value[1] ? 1 : 0);
  form.append('is_active', toggles.value[2] ? 1 : 0);

  const { call, data, errorMsg, success } = apiRequest(`/users/${isEditEmployerPage.value ? routeInstance.params.id : ''}`, {
    method: isEditEmployerPage.value ? 'put' : 'post',
    data: form,
  });

  await call();

  !success.value && toaster.danger(errorMsg.value ?? 'Something went wrong!');

  return data.value?.user?.id;
};

const saveUser = async () => {
  // we can make communication with user or alerts logic similar to the officeProfile

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
  successResponce = await updateAvatar(userId);

  // ********* Password update request
  if (isEditEmployerPage.value && userFields.password) { successResponce = await updatePassword(userId); }

  await redirect({ name: 'EditEmployer', params: { id: userId } });

  return successResponce && toaster.success('Profile updated successfully');
};

const setEmployerForm = async (payload) => {
  avatarFile.value = null;

  Object.keys(userFields).forEach((key) => {
    if (key === 'department_id') {
      userFields.department_id = payload.department?.id ?? '';
      return;
    }

    if (key === 'role_id') {
      // console.log(payload.roles); // array
      // userFields.role_id = payload.role?.id; // ===========> should be fixed later
      userFields.role_id = 2;
      return;
    }

    userFields[key] = payload[key] ?? '';
  });

  toggles.value = [
    payload.is_about_visible || false,
    payload.is_born_at_visible || false,
    payload.is_active || false,
  ];

  avatar.value = payload.avatar ?? defaultEmployerAvatar;

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
    avatarFile,
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
