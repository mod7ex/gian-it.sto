<script setup>
import {
  CheckIcon,
  XIcon,
  ArrowLeftIcon
} from '@heroicons/vue/outline';
import {ref} from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import TextArea from '@/UI/TextArea.vue';
import Cars from '@/Partials/Cars.vue';

const phones = ref(['']);
const emails = ref(['']);
</script>

<template>
  <OfficeLayout title="Добавление нового клиента">
    <template #actions>
      <Button type="secondary" link="/clients">
        <ArrowLeftIcon class="w-5 h-5 mr-1"/>
        Вернуться
      </Button>

      <Button color="green">
        <CheckIcon class="w-5 h-5 mr-1"/>
        Сохранить
      </Button>
    </template>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 sm:col-span-4">
        <Input label="Фамилия" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Input label="Имя" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Input label="Отчество" />
      </div>

      <div class="col-span-12 sm:col-span-4">
        <Select label="Пол" :options="['Мужчина', 'Женщина']" />
      </div>

      <div class="col-span-12 sm:col-span-8">
        <Input label="Адрес" />
      </div>

      <div class="col-span-12 sm:col-span-4 ">
        <Input label="Паспорт" mask="#### #######" />
      </div>

      <div class="col-span-12 sm:col-span-4 ">
        <Input label="День рождения" type="date" />
      </div>

      <div class="col-span-12 sm:col-span-4 ">
        <Select label="Город" :options="['Ростов-на-Дону', 'Краснодар']" />
      </div>

      <div class="col-span-12 sm:col-span-12">
        <div class="flex flex-row gap-4 flex-wrap items-end">
          <div v-for="(phone, index) in phones" class="flex items-end">
            <Input label="Телефон" mask="+7 ### ###-##-##" />
            <Button @click="phones.splice(index, 1)" color="red" class="ml-2" v-if="index > 0">
              <XIcon class="w-5 h-5" />
            </Button>
          </div>

          <Button @click="phones.push('')" type="secondary">
            Ещё
          </Button>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-12">
        <div class="flex flex-row gap-4 flex-wrap items-end">
          <div v-for="(email, index) in emails" class="flex items-end">
            <Input label="E-mail" type="email" />
            <Button @click="emails.splice(index, 1)" color="red" class="ml-2" v-if="index > 0">
              <XIcon class="w-5 h-5" />
            </Button>
          </div>

          <Button @click="emails.push('')" type="secondary">
            Ещё
          </Button>
        </div>
      </div>

      <div class="col-span-12 sm:col-span-12">
        <TextArea label="Примечания" rows="5" />
      </div>

      <div class="col-span-12 sm:col-span-12 mt-5">
        <div class="flex justify-between ql-align-center">
          <span>
            Автомобили
          </span>

          <Button color="blue">
            Добавить
          </Button>
        </div>

        <div>
          <Cars class="mt-2" />
        </div>
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped>

</style>
