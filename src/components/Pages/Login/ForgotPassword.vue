<script setup>
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useApi from '~/composables/useApi.js';

const { axiosInstance } = useApi();
const refreshPageTitle = ref('Забыли пароль?');
const successResponse = ref(false);
const successResponseMessage = ref('');
const errorResponse = ref(false);
const errorResponseMessage = ref('');
const loading = ref(false);
const form = reactive({
  email: '',
});
const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Укажите email', required),
    email: helpers.withMessage('Укажите верный email', email),
  },
}));

const v$ = useVuelidate(rules, form);

function cleanErrors() {
  errorResponse.value = false;
  errorResponseMessage.value = '';
}

const refresh = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  cleanErrors();
  loading.value = true;
  try {
    const res = await axiosInstance.post('auth/password/email', {
      email: form.email,
    });
    successResponse.value = true;
    successResponseMessage.value = form.email.value;
    refreshPageTitle.value = res.data.message;
  } catch (e) {
    errorResponse.value = true;
    errorResponseMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
    <LoginLayout :title="refreshPageTitle">
      <div class="mt-8">
        <div class="mt-6">
          <p v-if="successResponse" class="text-green-700 mb-6">{{ form.email }}</p>
          <p v-if="errorResponse" class="text-red-500 text-sm mb-6">{{ errorResponseMessage }}</p>
          <form action="#" method="POST" class="space-y-6">
            <Input label="E-mail" type="email" help="Введите ваш email, на него придёт ссылка для сброса пароля"
            v-model="v$.email.$model" v-if="!successResponse" :error="(v$.email.$error) ? v$.email.$silentErrors[0].$message : ''" />

            <Button color="blue" class="w-full justify-center" @click="refresh" :disabled="loading"
            :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" v-if="!successResponse">
              <span v-if="!loading">Отправить</span>
              <Spinner  v-if="loading" />
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
