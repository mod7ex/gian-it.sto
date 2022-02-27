import { ref, reactive, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import useApi from '~/composables/useApi.js';
import useAuth from '~/composables/useAuth.js';
import officeProfileValidationsRules from '~/validationsRules/officeProfile.js';

export default function officeProfile() {
  const { axiosInstance } = useApi();
  const { rules } = officeProfileValidationsRules();
  const isLoading = ref(false);
  const { user, setUser } = useAuth();
  const avatar = ref('');
  const isOpenModal = ref(false);

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
    isOpenModal.value = value;
  }

  const uploadNewAvatar = async (event) => {
    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);
    let response;
    try {
      response = await axiosInstance.post('profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      console.log(e.response.data);
    }
    if (response.data.success) {
      const responseAvatarObj = JSON.parse(response.data.avatar);
      avatar.value = responseAvatarObj.original_url;
      console.log(JSON.parse(response.data.avatar));
    }
  };
  const options = {};
  options.year = 'numeric';
  options.month = '2-digit';
  options.day = '2-digit';

  const updateProfile = async () => {
    console.log(user.value.born_at);
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
        born_at: '2000-01-02', // optional format Y-m-d user.value.born_at
        office_position: user.value.office_position, // optional
        is_about_visible: toggles.value[0],
        is_born_at_visible: toggles.value[1],

      });
    } catch (e) {
      // isErrorResponse.value = true;
      // errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
    } finally {
      isLoading.value = false;
    }
    console.log(res.data.user);
    if (res.data.success) {
      setUser(res.data.user);
    }
  };

  onMounted(() => {
    avatar.value = user.value.avatar;

    console.log(user.value.is_about_visible, user.value.is_born_at_visible);
  });

  return {
    isOpenModal,
    avatar,
    setIsOpenModalChangePassword,
    updateProfile,
    uploadNewAvatar,
    user,
    toggles,
    isLoading,
    v$,

  };
}
