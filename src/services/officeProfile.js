import { ref, reactive, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import useApi from '~/composables/useApi.js';
import useAuth from '~/composables/useAuth.js';
import officeProfileValidationsRules from '~/validationsRules/officeProfile.js';

export default function officeProfile() {
  const { axiosInstance } = useApi();
  const { rules } = officeProfileValidationsRules();
  const { user, setUser } = useAuth();
  const avatar = ref('');
  const isOpenModalChangePassword = ref(false);
  const isOpenToast = ref(false);
  const isLoading = ref(false);
  const isAvatarLoading = ref(false);
  const isSuccessResponse = ref('');
  const successResponseMessage = ref('');
  const errorResponseMessage = ref('');

  const fieldProfileForValidation = reactive({
    name: user.value.name,
    email: user.value.email,
  });

  const toggles = ref([
    user.value.is_about_visible,
    user.value.is_born_at_visible,
  ]);
  const v$ = useVuelidate(rules, fieldProfileForValidation, { $lazy: true });

  function setIsOpenModalChangePassword(value) {
    isOpenModalChangePassword.value = value;
  }

  function setIsShowToast(value) {
    isOpenToast.value = value;
  }

  const uploadNewAvatar = async (image) => {
    const formData = new FormData();
    formData.append('avatar', image);
    let response;
    try {
      response = await axiosInstance.post('profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      isSuccessResponse.value = false;
      errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
      setIsShowToast(true);
      setTimeout(setIsShowToast, 5000, false);
    } finally {
      isAvatarLoading.value = false;
    }
    if (response.data.success) {
      const responseAvatarObj = JSON.parse(response.data.avatar);
      avatar.value = responseAvatarObj.original_url;
      isSuccessResponse.value = true;
      successResponseMessage.value = 'Фото успешно обновлено';
      setIsShowToast(true);
      setTimeout(setIsShowToast, 5000, false);
    }
  };

  function checkAvatarSize(event) {
    isAvatarLoading.value = true;
    const maxFileSize = 1000000; // 10000000;
    const image = event.target.files[0];
    if (image.size > maxFileSize) {
      isAvatarLoading.value = false;
      isSuccessResponse.value = false;
      errorResponseMessage.value = 'Размер фото не должен превышать 10000 Кб';
      setIsShowToast(true);
      setTimeout(setIsShowToast, 5000, false);
      return;
    }
    uploadNewAvatar(image);
  }

  const updateProfile = async () => {
    v$.value.$touch();

    if (v$.value.$invalid) {
      return;
    }
    v$.value.$reset();

    isLoading.value = true;

    let res;
    try {
      res = await axiosInstance.put('profile', {
        name: fieldProfileForValidation.name,
        email: fieldProfileForValidation.email,
        surname: user.value.surname, // optional
        middle_name: user.value.middle_name, // optional
        phone: user.value.phone, // optional
        about: user.value.about, // optional
        born_at: '2000-01-02', // optional format Y-m-d user.value.born_at '2000-01-02'
        office_position: user.value.office_position, // optional
        is_about_visible: toggles.value[0],
        is_born_at_visible: toggles.value[1],

      });
    } catch (e) {
      isSuccessResponse.value = false;
      errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
      setIsShowToast(true);
      setTimeout(setIsShowToast, 5000, false);
    } finally {
      isLoading.value = false;
    }
    if (res.data.success) {
      isSuccessResponse.value = true;
      successResponseMessage.value = 'Данные успешно обновлены';
      setIsShowToast(true);
      setTimeout(setIsShowToast, 5000, false);
      setUser(res.data.user);
    }
  };

  onMounted(() => {
    avatar.value = user.value.avatar;
  });

  return {
    isOpenModalChangePassword,
    avatar,
    setIsOpenModalChangePassword,
    updateProfile,
    checkAvatarSize,
    user,
    toggles,
    v$,
    isOpenToast,
    isLoading,
    isSuccessResponse,
    successResponseMessage,
    errorResponseMessage,
    isAvatarLoading,

  };
}
