<script setup>
import { CheckIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import UploadImage from '@/UI/UploadImage.vue';
import Toggle from '@/UI/Toggle.vue';
import List from '@/UI/List.vue';

import ProfilePasswordModal from '@/Partials/ProfileChangePasswordModal.vue';
import profileChangePasswordHandler from '~/services/auth/profileChangePassword.js';
import officeProfile from '~/services/officeProfile.js';

const { setModalVisibility } = profileChangePasswordHandler();

const { v$, avatar, isUploadingAvatar, toggles, log, form, save, isValideAvatarFileSize, isBusy } = officeProfile();

</script>

<template>
    <OfficeLayout title="Личные данные">

      <profile-password-modal @close="setModalVisibility(false)" />

      <template #actions>

        <Button color="green" @click.prevent="save" :disabled="isBusy" :class="{ 'cursor-not-allowed': isBusy, 'opacity-60': isBusy }">
          <div v-if="isBusy" class="border-2 mr-1 border-blue-400  borderTopColorTransparent border-solid rounded-full animate-spin w-5 h-5 "></div>
          <CheckIcon v-else class="w-5 h-5 mr-1"/>
          Сохранить
        </Button>

        <Button color="blue" @click.prevent="setModalVisibility(true)">Сменить пароль</Button>
      </template>

      <div class="flex flex-col lg:flex-row">
        <UploadImage
          @selected="log"
          :image="avatar"
          label="Фото"
          class="mb-3"
          :error="!isValideAvatarFileSize ? 'Размер фото не должен превышать 10000 Кб' : ''"
          :loader="isUploadingAvatar"
        />

        <div class="flex-grow space-y-6">
          <div class="grid grid-cols-12 gap-6">

            <div class="col-span-12 sm:col-span-4">
              <Input label="Фамилия" v-model="form.surname" />
            </div>

            <div class="col-span-12 sm:col-span-4">
              <Input label="Имя" v-model="form.name" :error="(v$.name.$error) ? v$.name.$silentErrors[0].$message : ''" />
            </div>

            <div class="col-span-12 sm:col-span-4">
              <Input label="Отчество" v-model="form.middle_name"/>
            </div>

            <div class="col-span-12 sm:col-span-6">
              <Input label="Почта" type="email" v-model="form.email" :error="(v$.email.$error) ? v$.email.$silentErrors[0].$message : ''" />
            </div>

            <div class="col-span-12 sm:col-span-6">
              <Input label="Телефон" mask="+7 ### ###-##-##" v-model="form.phone" />
            </div>

          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 sm:col-span-6">
          <Input label="Дата рождения" type="date" v-model="form.born_at" />
        </div>
        <div class="col-span-12 sm:col-span-6">
          <Input label="Должность" v-model="form.office_position" />
        </div>

        <div class="col-span-12">
          <TextArea label="О себе" v-model="form.about"  rows="3" />
        </div>
      </div>

      <div class="pt-6 divide-y divide-gray-200">
        <div>
          <List
            class="mt-2"
            title="Приватность"
            subtitle="Здесь вы можете настроить поведение приложения - то что хотели бы не показывать"
            :items="[
              {
                key: 'is_about_visible',
                title: 'О себе',
                subtitle: 'Скрыть информацию о себе для других сотрудников',
              },
              {
                key: 'is_born_at_visible',
                title: 'День рождения',
                subtitle: 'Скрыть день рождения для других сотрудников',
              },
              {
                key: 'is_active',
                title: 'Виден активный статус',
                subtitle: 'скрыть активный статус от других сотрудников',
              },
            ]"
          >
            <template v-slot:right="{ item }">
              <Toggle v-model="toggles[item.key]"/>
            </template>
          </List>
        </div>
      </div>

    </OfficeLayout>
</template>

<style scoped>
.borderTopColorTransparent {
  border-top-color: transparent;
}
</style>
