<script setup>
import { useRouter } from 'vue-router';
import { ref, reactive, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, sameAs, helpers } from '@vuelidate/validators';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
import Spinner from '@/UI/Spinner.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import useApi from '~/composables/useApi.js';

const router = useRouter();
const { axiosInstance } = useApi();

const { token } = router.currentRoute.value.params;
const { email } = router.currentRoute.value.query;

const errorResponse = ref(false);
const errorResponseMessage = ref('');
const successResponse = ref(false);
const successResponseMessage = ref('');
const refreshPageTitle = ref('Придумайте новый пароль');
const loading = ref(false);
const fieldLength = ref(8);

const form = reactive({
  password: '',
  confirmPassword: '',
});
const rules = computed(() => ({
  password: {
    required: helpers.withMessage('Укажите новый пароль', required),
    minLength: helpers.withMessage(`Пароль должен содержать не менее ${fieldLength.value} символов`, minLength(fieldLength)),
  },
  confirmPassword: {
    required: helpers.withMessage('Укажите пароль ещё раз', required),
    sameAs: helpers.withMessage('Пароли должны совпадать', sameAs(form.password)),
  },
}));
const v$ = useVuelidate(rules, form);

function cleanErrors() {
  errorResponse.value = false;
  errorResponseMessage.value = '';
  v$.value.$reset();
}

const savePassword = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  v$.value.$reset();
  cleanErrors();
  loading.value = true;

  try {
    const res = await axiosInstance.post('auth/password/reset', {
      token,
      email,
      password: form.password,
    });

    successResponse.value = true;
    successResponseMessage.value = 'Теперь вы можете войти с новым паролем';
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
        <p v-if="successResponse" class="text-green-700 text-sm mb-6"> {{ successResponseMessage }} </p>
         <p v-if="errorResponse" class="text-red-500 text-sm mb-6"> {{ errorResponseMessage }} </p>
        <form class="space-y-6" @submit.prevent="savePassword">

          <Input v-if="!successResponse" label="Новый пароль" type="password" v-model="v$.password.$model" :error="(v$.password.$error) ? v$.password.$silentErrors[0].$message : ''" />

          <div class="space-y-1" v-if="!successResponse">
            <Input label="Повторите пароль" type="password" v-model="v$.confirmPassword.$model" :error="(v$.confirmPassword.$error) ? v$.confirmPassword.$silentErrors[0].$message : ''" />
          </div>

          <Button v-if="!successResponse" :disabled="loading" :class="{ 'cursor-not-allowed': loading, 'opacity-60': loading }" color="blue" class="w-full justify-center" @click.prevent="savePassword">
            <span v-if="!loading">Сохранить</span>
            <Spinner  v-if="loading" />
          </Button>
          <!-- We need this button to make form generally submittable -->
            <button class="hidden" type="submit">accessible submit button</button>

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
