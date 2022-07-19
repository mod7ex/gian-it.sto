import { ref, reactive, onMounted, effectScope, onScopeDispose } from 'vue';
import useVuelidate from '@vuelidate/core';
import useApi from '~/composables/useApi.js';
import useAuth from '~/composables/useAuth.js';
import useToast from '~/composables/useToast.js';
import useAvatar from '~/composables/useAvatar.js';
import officeProfileRules from '~/validationsRules/officeProfile.js';
import useToggles from '~/composables/useToggles.js';

const toaster = useToast();

let form;
let v$;

export default () => effectScope().run(() => {
  const { apiRequest } = useApi();
  const { rules } = officeProfileRules();
  const { user, setUser } = useAuth();
  const { avatar, isUploadingAvatar, isValideAvatarFileSize, log, setAvatar, updateAvatar } = useAvatar();

  const { toggles, setToggles, bitwisedToggles } = useToggles();

  if (!form) {
    form = reactive({
      name: user.value.name,
      email: user.value.email,

      surname: user.value.surname,
      middle_name: user.value.middle_name,
      phone: user.value.phone,
      about: user.value.about,
      born_at: user.value.born_at,
      office_position: user.value.office_position,
    });

    v$ = useVuelidate(rules, form, { $lazy: true });
  }

  const updateRawFields = async () => {
    const { call, data, errorMsg, success } = apiRequest('/profile', {
      method: 'put',
      data: {
        ...form,
        ...bitwisedToggles.value,
      },
    });

    await call();

    if (success.value) toaster.success('Ваши данные успешно обновлены');
    else toaster.danger(errorMsg.value ?? 'Undefined (network?) error');

    return data.value?.user;
  };

  const reset = async () => {
    setAvatar(user.value);

    Object.keys(form).forEach((key) => {
      form[key] = user.value[key] ?? '';
    });

    const { is_about_visible, is_born_at_visible, is_active } = user.value;
    setToggles({ is_about_visible, is_born_at_visible, is_active });

    if (!form.born_at) return;

    const [d, m, y] = form.born_at.split('.');
    form.born_at = `${y}-${m}-${d}`;
  };

  const isBusy = ref(false);

  const save = async () => {
    let isValideForm = await v$.value.$validate();

    isValideForm &&= isValideAvatarFileSize.value;

    if (!isValideForm) return;

    v$.value.$reset();

    isBusy.value = true;

    await updateAvatar('profile/avatar');

    const maybeUser = await updateRawFields();

    setUser(maybeUser);

    await reset();

    isBusy.value = false;
  };

  onMounted(async () => {
    await reset();
  });

  onScopeDispose(() => {
    form = undefined;
    v$ = undefined;
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
});
