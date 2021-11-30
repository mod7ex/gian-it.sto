<script setup>
import { useRouter } from 'vue-router';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Checkbox from '@/UI/Checkbox.vue';
import Link from '@/UI/Link.vue';
import LoginLayout from '@/Layout/Login.vue';
import { ArrowNarrowLeftIcon } from '@heroicons/vue/outline';
</script>

<template>
  <LoginLayout title="Придумайте новый пароль?">
    <div class="mt-8">
      <div class="mt-6">
        <form action="#" method="POST" class="space-y-6">
          <Input label="Новый пароль" type="password" />

          <div class="space-y-1">
            <Input label="Повторите пароль" type="password" />
          </div>

          <Button color="blue" class="w-full justify-center">
            Сохранить
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
