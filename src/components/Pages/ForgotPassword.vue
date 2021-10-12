<script setup>
import { useRouter } from 'vue-router';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Checkbox from '@/UI/Checkbox.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';

const router = useRouter();

function refresh () {
  router.push('/refresh-password');
}
</script>

<template>
    <LoginLayout>
      <template v-slot:title>
        Забыли пароль?
      </template>

      <div class="mt-8">
        <div class="mt-6">
          <form action="#" method="POST" class="space-y-6">
            <Input label="E-mail" type="email" help="Введите ваш email, на него придёт ссылка для сброса пароля" />

            <Button color="indigo" class="w-full justify-center" @click="refresh">
              Отправить
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
