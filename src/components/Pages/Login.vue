<script setup>
import { useRouter } from 'vue-router';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Checkbox from '@/UI/Checkbox.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';

const router = useRouter();

function login () {
  router.push('/dashboard');
}
</script>

<template>
  <LoginLayout>
    <template v-slot:title>
      Войдите в ваш аккаунт
    </template>

    <div class="mt-8">
      <div class="mt-6">
        <form action="#" method="POST" class="space-y-6">
          <Input label="E-mail" type="email" />

          <div class="space-y-1">
            <Input label="Пароль" type="password" />
          </div>

          <div class="flex items-center justify-between">
            <Checkbox label="Запомнить меня" />

            <div class="text-sm">
              <Link href="/forgot-password">
                Забыли пароль?
              </Link>
            </div>
          </div>

          <Button color="indigo" class="w-full justify-center" @click="login">
            Войти
          </Button>
        </form>
      </div>
    </div>
  </LoginLayout>
</template>

<style scoped>

</style>
