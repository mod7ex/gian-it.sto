<script setup>
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import UploadImage from '@/UI/UploadImage.vue';
import Toggle from '@/UI/Toggle.vue';
import EditUser from '@/Layout/users/EditUser.vue';

import service from '~/services/officeProfile.js';

const { v$, avatar, isUploadingAvatar, toggles, log, form, isValideAvatarFileSize } = service();

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
        <Input label="Фамилия" v-model="form.middle_name"/>
      </template>

      <template #name>
        <Input label="Имя" v-model="form.name" :error="(v$.name.$error) ? v$.name.$silentErrors[0].$message : ''" />
      </template>

      <template #surname>
        <Input label="Отчество" v-model="form.surname" />
      </template>

      <template #email>
        <Input label="Почта" type="email" v-model="form.email" :error="(v$.email.$error) ? v$.email.$silentErrors[0].$message : ''" />
      </template>

      <template #phone>
        <Input label="Телефон" mask="+7 ### ###-##-##" v-model="form.phone" />
      </template>

      <template #born_at>
        <Input label="Дата рождения" type="date" v-model="form.born_at" />
      </template>

      <template #office_position>
        <Input label="Должность" v-model="form.office_position" />
      </template>

      <template #about>
        <TextArea label="О себе" v-model="form.about"  rows="3" />
      </template>

      <template #settings="{ item }">
        <Toggle v-model="toggles[item.key]" />
      </template>
  </edit-user>
</template>
