import { computed, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';

const { apiRequest } = useApi();

const toaster = useToast();

const defaults = {
  avatar: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
  photo: 'https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png',
};

const avatar = ref(defaults.avatar);

const avatarFile = ref(null);

const isUploadingAvatar = ref(false);

const isValideAvatarFileSize = computed(() => {
  if (!avatarFile.value) return true;
  return avatarFile.value.size < import.meta.env.STO_AVATAR_MAX_SIZE;
});

const log = (event) => {
  [avatarFile.value] = event.target.files;
  avatar.value = window.URL.createObjectURL(avatarFile.value);
};

const setAvatar = (payload, key = 'avatar') => {
  avatarFile.value = null;
  if (!payload) return;
  avatar.value = payload[key] ?? defaults[key];
};

const updateAvatar = async (uri, fieldName = 'avatar') => {
  if (!avatarFile.value) return true;

  isUploadingAvatar.value = true;

  const form = new FormData();
  form.append(fieldName, avatarFile.value);

  const { call, errorMsg, success } = apiRequest(uri, {
    method: 'post',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  await call();

  isUploadingAvatar.value = false;

  if (success.value) toaster.success('Фото успешно обновлено');
  else toaster.danger(errorMsg.value ?? 'Что-то пошло не так, не удалось сохранить фото');

  return success.value;
};

export default function useAvatar() {
  return {
    avatar,
    avatarFile,
    isUploadingAvatar,
    isValideAvatarFileSize,
    log,
    setAvatar,
    updateAvatar,
    defaults,
  };
}
