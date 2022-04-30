import { ref, reactive, computed, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import useApi from '~/composables/useApi.js';
import useAuth from '~/composables/useAuth.js';
import useToast from '~/composables/useToast.js';
import officeProfileRules from '~/validationsRules/officeProfile.js';

const toaster = useToast();

const { apiRequest } = useApi();
const { rules } = officeProfileRules();
const { user, setUser } = useAuth();

const defaultEmployerAvatar = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

const toggles = ref([user.value.is_about_visible ?? false, user.value.is_born_at_visible ?? false]);

const avatar = ref(user.value.avatar);

const avatarFile = ref(null);

const isValideAvatarFileSize = computed(() => {
  if (!avatarFile.value) return true;
  return avatarFile.value.size < 10000000;
});

const form = reactive({
  name: user.value.name,
  email: user.value.email,

  surname: user.value.surname,
  middle_name: user.value.middle_name,
  phone: user.value.phone,
  about: user.value.about,
  born_at: user.value.born_at,
  office_position: user.value.office_position,
});

const v$ = useVuelidate(rules, form, { $lazy: true });

const log = (event) => {
  [avatarFile.value] = event.target.files;
  avatar.value = window.URL.createObjectURL(avatarFile.value);
};

const isUploadingAvatar = ref(false);

const updateAvatar = async () => {
  if (!avatarFile.value) return false;

  isUploadingAvatar.value = true;

  const aform = new FormData();
  aform.append('avatar', avatarFile.value);

  const { call, errorMsg, success } = apiRequest('profile/avatar', {
    method: 'post',
    data: aform,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  await call();

  isUploadingAvatar.value = false;

  if (success.value) toaster.success('Фото успешно обновлено');
  else toaster.danger(errorMsg.value ?? "Something went wrong , avatar couldn't be set");
  // !success.value && toaster.danger(errorMsg.value ?? "Something went wrong , avatar couldn't be set");

  return success.value;
};

const updateRawFields = async () => {
  const { call, data, errorMsg, success } = apiRequest('/profile', {
    method: 'put',
    data: {
      ...form,
      is_about_visible: toggles.value[0] ? 1 : 0,
      is_born_at_visible: toggles.value[1] ? 1 : 0,
    },
  });

  await call();

  if (success.value) toaster.success('Your data was updated successfully');
  else toaster.danger(errorMsg.value ?? 'Undefined (network?) error');
  // !success.value && toaster.danger(errorMsg.value ?? 'Undefined (network?) error');

  return data.value?.user;
};

const reset = async () => {
  avatarFile.value = null;

  Object.keys(form).forEach((key) => {
    form[key] = user.value[key] ?? '';
  });

  toggles.value = [
    user.value.is_about_visible || false,
    user.value.is_born_at_visible || false,
    user.value.is_active || false,
  ];

  avatar.value = user.value.avatar ?? defaultEmployerAvatar;

  if (!form.born_at) return;

  const [d, m, y] = form.born_at.split('.');
  form.born_at = `${y}-${m}-${d}`;
};

const isBusy = ref(false);

const save = async () => {
  let isValideForm = await v$.value.$validate();

  isValideForm = isValideAvatarFileSize.value && isValideForm;

  if (!isValideForm) return;

  v$.value.$reset();

  isBusy.value = true;

  await updateAvatar();

  const maybeUser = await updateRawFields();

  setUser(maybeUser);

  await reset();

  isBusy.value = false;
};

export default function officeProfile() {
  onMounted(async () => {
    await reset();
  });

  return {
    v$,
    avatar,
    isUploadingAvatar,
    toggles,
    log,
    form,
    save,
    isValideAvatarFileSize,
    isBusy,
  };
}
