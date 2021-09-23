<script setup>
import Input from './../UI/Input.vue';
import { h, ref, reactive } from 'vue'

const zip = ref('text');

const log = () => console.log(zip.value);
</script>

<template>
  <h2 class="mt-5 mb-1 font-bold text-xl">Формы</h2>

  <div class="w-full max-w-xs">
    <Input label="Имя" type="text" placeholder="Иванов Иван" class="mt-2" />

    <Input label="Email" type="email" placeholder="you@example.com" class="mt-2" />

    <Input label="Пароль" type="password" help="Больше 6 символов" class="mt-2" />

    <Input label="Индекс" type="text" error="Индекс должен быть числовым" class="mt-2" v-model="zip" />

    <Input type="text" placeholder="Ещё вариант" class="mt-2" v-model="zip" />

    <Input label="Город" type="text" meta="Обязательно" class="mt-4"/>

    <Input label="Валюта" type="text" meta="Обязательно" :classMap="['pl-6', 'pr-12']" class="mt-4">
      <template #before>
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span class="text-gray-500 sm:text-sm">
            $
          </span>
        </div>
      </template>

      <template #after>
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span class="text-gray-500 sm:text-sm" id="price-currency">
            USD
          </span>
        </div>
      </template>
    </Input>

    <Input label="Мобильный" error="Введите правильный телефон" type="text" meta="Обязательно" :classMap="['pl-14']" class="mt-4">
      <template #before>
        <div class="absolute inset-y-0 left-0 flex items-center">
          <label for="country" class="sr-only">Country</label>
          <select id="country" name="country" class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
            <option>US</option>
            <option>CA</option>
            <option>EU</option>
          </select>
        </div>
      </template>
    </Input>
  </div>
</template>

<style scoped>

</style>
