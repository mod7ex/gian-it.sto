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
  const isAvatarLoading = ref(false);

  const isOpenToast = ref(false);
  const isUpdatingDataProfile = ref(false);
  const isSuccessResponse = ref('');
  const successResponseMessage = ref('');
  const errorResponseMessage = ref('');

  const fieldProfileForValidation = reactive({
    name: user.value.name,
    email: user.value.email,
  });

  const fieldsProfile = reactive({
    surname: user.value.surname,
    middleName: user.value.middle_name,
    phone: user.value.phone,
    about: user.value.about,
    bornAt: user.value.born_at,
    officePosition: user.value.office_position,
  });

  const toggles = ref([
    user.value.is_about_visible,
    user.value.is_born_at_visible,
  ]);
  const v$ = useVuelidate(rules, fieldProfileForValidation, { $lazy: true });

  function setIsShowToast(value) {
    isOpenToast.value = value;
  }
  function showToast() {
    setIsShowToast(true);
    setTimeout(setIsShowToast, 5000, false);
  }

  const uploadNewAvatar = async (image) => {
    isAvatarLoading.value = true;
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
      showToast();
    } finally {
      isAvatarLoading.value = false;
    }
    if (response.data.success) {
      const responseAvatarObj = JSON.parse(response.data.avatar);
      avatar.value = responseAvatarObj.original_url;
      isSuccessResponse.value = true;
      successResponseMessage.value = 'Фото успешно обновлено';
      showToast();
    }
  };

  function checkAvatarSize(event) {
    const maxFileSize = 10000000;
    const image = event.target.files[0];
    if (image.size > maxFileSize) {
      isSuccessResponse.value = false;
      errorResponseMessage.value = 'Размер фото не должен превышать 10000 Кб';
      showToast();
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

    isUpdatingDataProfile.value = true;

    let res;
    try {
      res = await axiosInstance.put('profile', {
        name: fieldProfileForValidation.name,
        email: fieldProfileForValidation.email,
        surname: fieldsProfile.surname,
        middle_name: fieldsProfile.middleName,
        phone: fieldsProfile.phone,
        about: fieldsProfile.about,
        born_at: fieldsProfile.bornAt,
        office_position: fieldsProfile.officePosition,
        is_about_visible: toggles.value[0],
        is_born_at_visible: toggles.value[1],

      });
    } catch (e) {
      isSuccessResponse.value = false;
      errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
      showToast();
    } finally {
      isUpdatingDataProfile.value = false;
    }
    if (res.data.success) {
      isSuccessResponse.value = true;
      successResponseMessage.value = 'Данные успешно обновлены';
      showToast();
      setUser(res.data.user);
    }
  };

  onMounted(() => {
    avatar.value = user.value.avatar;
  });

  return {
    v$,
    fieldsProfile,
    avatar,
    checkAvatarSize,
    isAvatarLoading,
    updateProfile,
    toggles,
    isOpenToast,
    isUpdatingDataProfile,
    isSuccessResponse,
    successResponseMessage,
    errorResponseMessage,

  };
}
