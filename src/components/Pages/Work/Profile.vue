<script setup>
import { CheckIcon } from '@heroicons/vue/outline';
import profileChangePasswordHandler from '~/services/auth/profileChangePassword.js';
import ProfileFields from '@/Partials/work/profile.vue';
import useSuspense from '~/composables/useSuspense.js';
import service from '~/services/officeProfile.js';
import Layout from '@/Layout/Work.vue';
import Button from '@/UI/Button.vue';
import Card from '@/UI/Card.vue';

const { save, isBusy } = service();
const { render } = profileChangePasswordHandler();

const SuspenseArea = useSuspense(ProfileFields);

</script>

<template>
    <Layout title="Личные данные">

      <template #actions>

        <Button color="green" @click.prevent="save" :disabled="isBusy" :class="{ 'cursor-not-allowed': isBusy, 'opacity-60': isBusy }">
          <div v-if="isBusy" class="border-2 mr-1 border-blue-400 borderTopColorTransparent border-solid rounded-full animate-spin w-5 h-5 "></div>
          <CheckIcon v-else class="w-5 h-5 mr-1"/>Сохранить
        </Button>

        <Button color="blue" @click.prevent="render">Сменить пароль</Button>

      </template>

      <Card>
        <template #header>
          <h1 class="text-lg leading-6 font-medium text-gray-900">Ваши данные</h1>
        </template>

        <!-- Suspense area -->
        <suspense-area />
      </Card>
    </Layout>
</template>
