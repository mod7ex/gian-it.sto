import { ref, reactive, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import useApi from '~/composables/useApi.js';
import useAuth from '~/composables/useAuth.js';
import useToast from '~/composables/useToast.js';
import useAvatar from '~/composables/useAvatar.js';
import officeProfileRules from '~/validationsRules/officeProfile.js';

const toaster = useToast();

const { apiRequest } = useApi();
const { rules } = officeProfileRules();
const { user, setUser } = useAuth();
const { avatar, isUploadingAvatar, isValideAvatarFileSize, log, setAvatar, updateAvatar } = useAvatar();

const toggles = ref([user.value.is_about_visible ?? false, user.value.is_born_at_visible ?? false]);

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
  // avatarFile.value = null;
  // avatar.value = user.value.avatar ?? defaultEmployerAvatar;
  setAvatar(user.value);

  Object.keys(form).forEach((key) => {
    form[key] = user.value[key] ?? '';
  });

  toggles.value = [
    user.value.is_about_visible || false,
    user.value.is_born_at_visible || false,
    user.value.is_active || false,
  ];

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

  await updateAvatar('profile/avatar');

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
