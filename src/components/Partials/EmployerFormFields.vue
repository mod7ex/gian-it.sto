<script setup>
import {
  CheckIcon,
  ArrowLeftIcon,
  ExclamationIcon,
} from "@heroicons/vue/outline";
import OfficeLayout from "@/Layout/Office.vue";
import Button from "@/UI/Button.vue";
import Input from "@/UI/Input.vue";
import TextArea from "@/UI/TextArea.vue";
import UploadImage from "@/UI/UploadImage.vue";
import Toggle from "@/UI/Toggle.vue";
import Select from "@/UI/Select.vue";
import List from "@/UI/List.vue";
import { onMounted } from "@vue/runtime-core";
import employerForm from "~/services/employerForm.js";
import useAppRouter from '~/composables/useAppRouter.js';

const { router, route } = useAppRouter();

let {
  departmentOptions,
  roleOptions,
  isValideAvatarFileSize,
  log,
  avatar,
  userFields,
  v$,
  toggles,
  fetchDepartments,
  fetchRoles,
  setEmployerForm,
  isEditEmployerPage,
  fetchSubjectUser,
} = employerForm();

/* ************ Fetch Departments & Roles ************ */
await fetchDepartments();
await fetchRoles();

onMounted(async () => {
  let payload = {};

  if (isEditEmployerPage.value) {
    if (!route.params.id) return router.back();
    payload = await fetchSubjectUser(route.params.id);
  }

  /* ************ Bind user data in case of role edit page (or even create page {}) ************ */
  await setEmployerForm(payload);
});
</script>

<template>
  <div class="flex flex-col lg:flex-row">
    <UploadImage
      @selected="log"
      :image="avatar"
      label="Фото"
      class="mb-3"
      :error="
        !isValideAvatarFileSize
          ? 'Размер фото не должен превышать 10000 Кб'
          : ''
      "
    />

    <div class="flex-grow space-y-6">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-4">
          <Input label="Фамилия" v-model="userFields.middle_name" />
        </div>

        <div class="col-span-12 sm:col-span-4">
          <Input
            label="Имя"
            v-model="userFields.name"
            :required="true"
            :error="v$.name.$errors[0]?.$message"
            @blured="v$.name.$touch"
          />
        </div>

        <div class="col-span-12 sm:col-span-4">
          <Input label="Отчество" v-model="userFields.surname" />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <Input
            label="Почта"
            type="email"
            v-model="userFields.email"
            :required="true"
            :error="v$.email.$errors[0]?.$message"
            @blured="v$.email.$touch"
          />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <Input
            label="Телефон"
            mask="+7 ### ###-##-##"
            v-model="userFields.phone"
          />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <Input
            label="Новый пароль"
            type="password"
            v-model="userFields.password"
            :required="true"
            :error="v$.password.$errors[0]?.$message"
            @blured="v$.password.$touch"
          />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <Input
            label="Подтвердите новый пароль"
            type="password"
            v-model="userFields.password_confirmation"
            :required="true"
            :error="v$.password_confirmation.$errors[0]?.$message"
            @blured="v$.password_confirmation.$touch"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-12 gap-6 mt-5">
    <div class="col-span-12 sm:col-span-6 lg:col-span-4">
      <Input label="Дата рождения" type="date" v-model="userFields.born_at" />
    </div>

    <div class="col-span-12 sm:col-span-6 lg:col-span-4">
      <Input label="Должность" v-model="userFields.office_position" />
    </div>

    <div class="col-span-12 sm:col-span-6 lg:col-span-4">
      <Select
        label="Роль"
        :options="roleOptions"
        v-model="userFields.role_id"
        :required="true"
        :error="v$.role_id.$errors[0]?.$message"
        @blured="v$.role_id.$touch"
      />
    </div>

    <div class="col-span-12 sm:col-span-6 lg:col-span-4">
      <Select
        label="Отделение"
        :options="departmentOptions"
        v-model="userFields.department_id"
        :required="true"
        :error="v$.department_id.$errors[0]?.$message"
        @blured="v$.department_id.$touch"
      />
    </div>

    <div class="col-span-12">
      <TextArea label="О сотруднике" rows="3" v-model="userFields.about" />
    </div>
  </div>

  <div class="pt-6 divide-y divide-gray-200">
    <div>
      <List
        class="mt-2"
        :items="[
          {
            title: 'О себе',
            subtitle: 'Скрыть информацию о себе для других сотрудников',
          },
          {
            title: 'День рождения',
            subtitle: 'Скрыть день рождения для других сотрудников',
          },
          {
            title: 'Виден активный статус',
            subtitle: 'скрыть активный статус от других сотрудников',
          },
        ]"
        title="Приватность"
        subtitle="Здесь вы можете настроить поведение приложения - то что хотели бы не показывать"
      >
        <template v-slot:right="{ item, index }">
          <Toggle v-model="toggles[index]" />
        </template>
      </List>
    </div>
  </div>
</template>

<style scoped></style>
