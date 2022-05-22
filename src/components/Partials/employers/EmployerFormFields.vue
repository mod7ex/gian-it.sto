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
import employerForm from "~/services/employers/employerForm.js";
import useAppRouter from "~/composables/useAppRouter.js";
import EditUser from "@/Layout/users/EditUser.vue";

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
  atMountedEmployerForm,
  isUploadingAvatar,
} = employerForm();

await atMountedEmployerForm();
</script>

<template>
  <edit-user>
    <template #avatar>
      <UploadImage
        @selected="log"
        :image="avatar"
        label="Фото"
        class="mb-3"
        :error="!isValideAvatarFileSize ? 'Размер фото не должен превышать 10000 Кб' : ''"
        :loader="isUploadingAvatar"
      />
    </template>

    <template #middle_name>
      <Input label="Фамилия" v-model="userFields.middle_name" />
    </template>

    <template #name>
      <Input
        label="Имя"
        v-model="userFields.name"
        :required="true"
        :error="v$.name.$errors[0]?.$message"
        @blured="v$.name.$touch"
      />
    </template>

    <template #surname>
      <Input label="Отчество" v-model="userFields.surname" />
    </template>

    <template #email>
      <Input
        label="Почта"
        type="email"
        v-model="userFields.email"
        :required="true"
        :error="v$.email.$errors[0]?.$message"
        @blured="v$.email.$touch"
      />
    </template>

    <template #phone>
      <Input
        label="Телефон"
        mask="+7 ### ###-##-##"
        v-model="userFields.phone"
      />
    </template>

    <template #password>
      <Input
        label="Новый пароль"
        type="password"
        v-model="userFields.password"
        :required="true"
        :error="v$.password.$errors[0]?.$message"
        @input="v$.password.$touch"
      />
    </template>

    <template #password_confirmation>
      <Input
        label="Подтвердите новый пароль"
        type="password"
        v-model="userFields.password_confirmation"
        :required="true"
        :error="v$.password_confirmation.$errors[0]?.$message"
        @input="v$.password_confirmation.$touch"
      />
    </template>

    <template #born_at>
      <Input label="Дата рождения" type="date" v-model="userFields.born_at" />
    </template>

    <template #office_position>
      <Input
        label="Должность"
        v-model="userFields.office_position"
      />
    </template>

    <template #role>
      <Select
        label="Роль"
        :options="roleOptions"
        v-model="userFields.role_id"
        :required="true"
        :error="v$.role_id.$errors[0]?.$message"
        @blured="v$.role_id.$touch"
      />
    </template>

    <template #department>
      <Select
        label="Отделение"
        :options="departmentOptions"
        v-model="userFields.department_id"
        :required="true"
        :error="v$.department_id.$errors[0]?.$message"
        @blured="v$.department_id.$touch"
      />
    </template>

    <template #about>
      <TextArea label="О сотруднике" rows="3" v-model="userFields.about" />
    </template>

    <template #settings="{ item }">
      <Toggle v-model="toggles[item.key]" />
    </template>
  </edit-user>
</template>
