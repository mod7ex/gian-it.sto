<script setup>
import { useRouter } from 'vue-router';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Checkbox from '@/UI/Checkbox.vue';
import Link from '@/UI/Link.vue';

const router = useRouter()

function login () {
  router.push('/dashboard');
}
</script>

<template>
  <div class="min-h-screen bg-white flex">
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
            Войдите в ваш аккаунт
          </h2>
        </div>

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
                  <Link>
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
      </div>
    </div>
    <div class="hidden lg:block relative w-0 flex-1">
      <img class="absolute inset-0 h-full w-full object-cover"
           src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
           alt=""
      />
    </div>
  </div>
</template>

<style scoped>

</style>
