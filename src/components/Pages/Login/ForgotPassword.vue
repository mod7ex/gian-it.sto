<script setup>
// import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useApi from '~/composables/useApi.js';

// const router = useRouter();
const { axiosInstance } = useApi();
const email = ref('');
const success = ref(false);
const successMessage = ref('');
const error = ref(false);
const errorMessage = ref('');
const loading = ref(false);

const refresh = async () => {
  error.value = false;
  errorMessage.value = '';
  try {
    console.log(email.value);
    const res = await axiosInstance.post('auth/password/email', {
      email: email.value,
    });
    console.log(res.data);
    success.value = true;
    successMessage.value = res.data.message;
  } catch (e) {
    console.log(e.response.data);
    error.value = true;
    errorMessage.value = e.response.data.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
    <LoginLayout title="Забыли пароль?">
      <div class="mt-8">
        <div class="mt-6">
          <p v-if="success" class="text-green-700 font-bold mb-6">{{ successMessage }}</p>
          <p v-if="error" class="text-red-500  text-center font-bold mb-6">{{ errorMessage }}</p>
          <form action="#" method="POST" class="space-y-6">
            <Input label="E-mail" type="email" help="Введите ваш email, на него придёт ссылка для сброса пароля" v-model="email" />

            <Button color="blue" class="w-full justify-center" @click="refresh" :disabled="loading" :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }">
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
