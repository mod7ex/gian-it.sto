<script setup>
import { CheckIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import UploadImage from '@/UI/UploadImage.vue';
import Toggle from '@/UI/Toggle.vue';
import EditUser from '@/Layout/users/EditUser.vue';
import ProfilePasswordModal from '@/Partials/ProfileChangePasswordModal.vue';
import profileChangePasswordHandler from '~/services/auth/profileChangePassword.js';
import service from '~/services/officeProfile.js';

const { setModalVisibility } = profileChangePasswordHandler();

const { v$, avatar, isUploadingAvatar, toggles, log, form, save, isValideAvatarFileSize, isBusy } = service();

</script>

<template>
    <OfficeLayout title="Личные данные">

      <profile-password-modal @close="setModalVisibility(false)" />

      <template #actions>
        <Button color="green" @click.prevent="save" :disabled="isBusy" :class="{ 'cursor-not-allowed': isBusy, 'opacity-60': isBusy }">
          <div v-if="isBusy" class="border-2 mr-1 border-blue-400 borderTopColorTransparent border-solid rounded-full animate-spin w-5 h-5 "></div>
          <CheckIcon v-else class="w-5 h-5 mr-1"/>Сохранить
        </Button>

        <Button color="blue" @click.prevent="setModalVisibility(true)">Сменить пароль</Button>
      </template>

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
    </OfficeLayout>
</template>

<style scoped>
.borderTopColorTransparent {
  border-top-color: transparent;
}
</style>
