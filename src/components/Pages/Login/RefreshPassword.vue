<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Validator from 'Validator';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useApi from '~/composables/useApi.js';

const router = useRouter();
const { axiosInstance } = useApi();

const { token } = router.currentRoute.value.params;
const { email } = router.currentRoute.value.query;
const password = ref('');
const repeatPassword = ref('');
const validationErrors = ref({
  password: '',
  password_confirm: '',
});
const error = ref(false);
const errorMessage = ref('');
const success = ref(false);

const refreshPageTitle = ref('Придумайте новый пароль');
const successMessage = ref('');
const loading = ref(false);

function cleanErrors() {
  validationErrors.value.password = '';
  validationErrors.value.password_confirm = '';
  error.value = false;
  errorMessage.value = '';
}

function makeValidator() {
  const validateData = {
    password: password.value,
    password_confirm: repeatPassword.value,
  };

  const validateRules = {
    password: 'required|min:8',
    password_confirm: 'required|same:password',
  };

  const validateMessages = {
    'password_confirm.required': 'Укажите пароль ещё раз',
    'password_confirm.same': 'Пароли должны совпадать',
    'password.required': 'Укажите новый пароль',
    'password.min': 'Пароль должен содержать не менее 8 символов',
  };

  return Validator.make(validateData, validateRules, validateMessages);
}

const savePassword = async () => {
  const validator = makeValidator();

  if (validator.fails()) {
    const errors = validator.getErrors();
    validationErrors.value = {
      password: (errors.password) ? errors.password[0] : '',
      password_confirm: (errors.password_confirm) ? errors.password_confirm[0] : '',
    };
    return;
  }

  cleanErrors();

  try {
    const res = await axiosInstance.post('auth/password/reset', {
      token,
      email,
      password: password.value,
    });

    success.value = true;
    successMessage.value = 'Теперь вы можете войти с новым паролем';
    refreshPageTitle.value = res.data.message;
  } catch (e) {
    error.value = true;
    errorMessage.value = e.response.data.message;
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <LoginLayout :title="refreshPageTitle">
    <div class="mt-8">
      <div class="mt-6">
        <p v-if="success" class="text-green-700 font-bold mb-6">
        {{ successMessage }}
        </p>
        <form action="#" method="POST" class="space-y-6">

          <Input v-if="!success" label="Новый пароль" type="password" v-model="password" :error="validationErrors.password" />

          <div class="space-y-1" v-if="!success">
            <Input label="Повторите пароль" type="password" v-model="repeatPassword" :error="validationErrors.password_confirm" />
          </div>

          <Button v-if="!success" :disabled="loading" :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" color="blue" class="w-full justify-center" @click.prevent="savePassword">
            <span v-if="!loading">Сохранить</span>
            <div
              v-if="loading"
              class="spinner-border animate-spin inline-block w-8 h-8 border-b-2 rounded-full"
              role="status"
            ></div>
          </Button>
          <p v-if="error" class="text-red-500 text-xs text-center font-bold">
          {{ errorMessage }}
          </p>

          <Link href="/" class="flex text-sm">
            <ArrowNarrowLeftIcon class="h-5 w-5 mr-1" aria-hidden="true" />
            На страницу входа
          </Link>
        </form>
      </div>
    </div>
  </LoginLayout>
</template>

<style scoped>

</style>
