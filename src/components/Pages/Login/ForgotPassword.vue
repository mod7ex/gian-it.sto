<script setup>
import { ref } from 'vue';
import Validator from 'Validator';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useApi from '~/composables/useApi.js';

const { axiosInstance } = useApi();
const refreshPageTitle = ref('Забыли пароль?');
const email = ref('');
const success = ref(false);
const successMessage = ref('');
const error = ref(false);
const errorMessage = ref('');
const loading = ref(false);
const validationErrors = ref({
  email: '',
});

function cleanErrors() {
  validationErrors.value.email = '';
  error.value = false;
  errorMessage.value = '';
}

function makeValidator() {
  const validateData = {
    email: email.value,
  };

  const validateRules = {
    email: 'required|email',
  };

  const validateMessages = {
    'email.email': 'Укажите верный email',
    'email.required': 'Укажите email',
  };

  return Validator.make(validateData, validateRules, validateMessages);
}

const refresh = async () => {
  const validator = makeValidator();

  if (validator.fails()) {
    const errors = validator.getErrors();
    validationErrors.value = {
      email: (errors.email) ? errors.email[0] : '',
    };
    return;
  }

  cleanErrors();

  loading.value = true;
  try {
    const res = await axiosInstance.post('auth/password/email', {
      email: email.value,
    });
    success.value = true;
    successMessage.value = email.value;
    refreshPageTitle.value = res.data.message;
  } catch (e) {
    error.value = true;
    errorMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
    <LoginLayout :title="refreshPageTitle">
      <div class="mt-8">
        <div class="mt-6">
          <p v-if="success" class="text-green-700 mb-6">{{ email }}</p>
          <p v-if="error" class="text-red-500 text-sm mb-6">{{ errorMessage }}</p>
          <form action="#" method="POST" class="space-y-6">
            <Input label="E-mail" type="email" help="Введите ваш email, на него придёт ссылка для сброса пароля"
            v-model="email" v-if="!success" :error="validationErrors.email" />

            <Button color="blue" class="w-full justify-center" @click="refresh" :disabled="loading"
            :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" v-if="!success">
              <span v-if="!loading">Отправить</span>
              <div
              v-if="loading"
              class="spinner-border animate-spin inline-block w-8 h-8 border-b-2 rounded-full"
              role="status"
            ></div>
            </Button>

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
