<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive, computed, onMounted } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useAuth from '~/composables/useAuth.js';
import useApi from '~/composables/useApi.js';

const router = useRouter();
const { setUser, setToken } = useAuth();
const { axiosInstance } = useApi();
const error = ref(false);
const errorMessage = ref('');
const loading = ref(false);
const form = reactive({
  email: '',
  password: '',
});

const rules = computed(() => ({
  email: {
    required: helpers.withMessage('Укажите email', required),
    email: helpers.withMessage('Укажите верный email', email),
  },
  password: { required: helpers.withMessage('Укажите пароль', required) },
}));

const v$ = useVuelidate(rules, form);

const login = async () => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return;
  }

  error.value = false;
  errorMessage.value = '';

  loading.value = true;
  try {
    const res = await axiosInstance.post('auth/login', {
      email: form.email,
      password: form.password,
    });
    setToken(res.data.api_token);
    setUser(res.data.user);
    router.push('/dashboard');
  } catch (e) {
    error.value = true;
    errorMessage.value = (e.response) ? e.response.data.message : 'Undefined (network?) error';
  } finally {
    loading.value = false;
  }
};

const checkLogin = async () => {
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    try {
      const res = await axiosInstance.get('auth/user', {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });
      setToken(savedToken);
      setUser(res.data.user);
      router.push('/dashboard');
    } catch (e) {
      console.error('Error request', e.response.data);
    }
  }
};
onMounted(() => {
  checkLogin();
});
</script>

<template>
  <LoginLayout title="Войдите в ваш аккаунт">
    <div class="mt-8">
      <div class="mt-6">
        <form class="space-y-6" @submit.prevent="login">
          <Input label="E-mail" type="email" v-model="v$.email.$model" :error="(v$.email.$error) ? v$.email.$silentErrors[0].$message : ''" />

          <div class="space-y-1">
            <Input label="Пароль" type="password" v-model="v$.password.$model" :error="(v$.password.$error) ? v$.password.$errors[0].$message : ''" />

          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm">
              <Link href="/forgot-password">Забыли пароль?</Link>
            </div>
          </div>

          <!-- We need this button to make form generally submittable -->
          <button style="display: none;" type="submit">
            accessible submit button
          </button>

          <Button
            :disabled="loading"
            :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }"
            color="blue"
            class="w-full justify-center"
            @click.prevent="login"
          >
            <span v-if="!loading">Войти</span>
            <div
              v-if="loading"
              class="spinner-border animate-spin inline-block w-8 h-8 border-b-2 rounded-full"
              role="status"
            ></div>
          </Button>
        </form>
        <p v-if="error" class="text-red-500 text-sm text-center mt-6">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </LoginLayout>
</template>

<style scoped></style>
