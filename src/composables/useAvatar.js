import { computed, ref } from 'vue';
import useApi from '~/composables/useApi.js';
import useToast from '~/composables/useToast.js';

const { apiRequest } = useApi();

const toaster = useToast();

const defaultEmployerAvatar = 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png';

const avatar = ref(defaultEmployerAvatar);

const avatarFile = ref(null);

const isUploadingAvatar = ref(false);

const isValideAvatarFileSize = computed(() => {
  if (!avatarFile.value) return true;
  return avatarFile.value.size < 10000000;
});

const log = (event) => {
  [avatarFile.value] = event.target.files;
  avatar.value = window.URL.createObjectURL(avatarFile.value);
};

const setAvatar = (payload) => {
  avatarFile.value = null;
  if (!payload) return;
  avatar.value = payload.avatar ?? defaultEmployerAvatar;
};

const updateAvatar = async (uri) => {
  if (!avatarFile.value) return false;

  isUploadingAvatar.value = true;

  const form = new FormData();
  form.append('avatar', avatarFile.value);

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
  else toaster.danger(errorMsg.value ?? "Something went wrong , avatar couldn't be set");
  // !success.value && toaster.danger(errorMsg.value ?? "Something went wrong , avatar couldn't be set");

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
  };
}
