<script setup>
import { CheckIcon, XCircleIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import TextArea from '@/UI/TextArea.vue';
import UploadImage from '@/UI/UploadImage.vue';
import Toggle from '@/UI/Toggle.vue';
import List from '@/UI/List.vue';
import ProfileChangePasswordModal from '@/Partials/ProfileChangePasswordModal.vue';
import officeProfile from '~/services/officeProfile.js';
import Toast from '@/UI/Toast.vue';

const { isOpenModalChangePassword, avatar, setIsOpenModalChangePassword, updateProfile, checkAvatarSize, isAvatarLoading, user, toggles, v$, isOpenToast,
  isLoading, isSuccessResponse, successResponseMessage, errorResponseMessage } = officeProfile();

</script>

<template>
    <OfficeLayout title="Личные данные">
      <Toast
      v-if="isOpenToast"
      :title="(isSuccessResponse === true) ? 'Сообщение об успешной операции' : 'Сообщение о ошибке'"
      :text="(isSuccessResponse === true) ? successResponseMessage : errorResponseMessage"
      :icon="(isSuccessResponse) ? CheckIcon : XCircleIcon" :color="(isSuccessResponse === true) ? 'green' : 'red'">
      </Toast>
      <ProfileChangePasswordModal :show="isOpenModalChangePassword" @close-modal="setIsOpenModalChangePassword(false)"></ProfileChangePasswordModal>
      <template #actions>
        <Button color="green" @click.prevent="updateProfile" :disabled="isLoading" :class="{ 'cursor-not-allowed': isLoading, 'opacity-60': isLoading }">
          <CheckIcon  v-if="!isLoading" class="w-5 h-5 mr-1"/>
          <div v-if="isLoading" class="border-2 mr-1 border-blue-400  borderTopColorTransparent border-solid rounded-full animate-spin w-5 h-5 "></div>
          Сохранить
        </Button>

        <Button color="blue" @click.prevent="setIsOpenModalChangePassword(true)">
          Сменить пароль
        </Button>
      </template>

      <div class="flex flex-col lg:flex-row">
        <UploadImage @selected="checkAvatarSize" :image="avatar" label="Фото" class="mb-3" :loader="isAvatarLoading"></UploadImage>

        <div class="flex-grow space-y-6">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 sm:col-span-4">
              <Input label="Фамилия" v-model="user.surname" />
            </div>

            <div class="col-span-12 sm:col-span-4">
              <Input label="Имя" v-model="v$.name.$model" :error="(v$.name.$error) ? v$.name.$silentErrors[0].$message : ''" />
            </div>

            <div class="col-span-12 sm:col-span-4">
              <Input label="Отчество" v-model="user.middle_name"/>
            </div>

            <div class="col-span-12 sm:col-span-6">
              <Input label="Почта" type="email" v-model="v$.email.$model" :error="(v$.email.$error) ? v$.email.$silentErrors[0].$message : ''" />
            </div>

            <div class="col-span-12 sm:col-span-6">
              <Input label="Телефон" mask="+7 ### ###-##-##" v-model="user.phone" />
            </div>

          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="col-span-12 sm:col-span-6">
          <Input label="Дата рождения" type="date" value="2022-02-27" v-model="user.born_at" />
        </div>

        <div class="col-span-12 sm:col-span-6">
          <Input label="Должность" v-model="user.office_position" />
        </div>

        <div class="col-span-12">
          <TextArea label="О себе" v-model="user.about"  rows="3" />
        </div>
      </div>
      <div class="pt-6 divide-y divide-gray-200">
        <div>
          <List class="mt-2" :items="[
          {title: 'О себе', subtitle: 'Скрыть информацию о себе для других сотрудников'},
          {title: 'День рождения', subtitle: 'Скрыть день рождения для других сотрудников'}
        ]" title="Приватность" subtitle="Здесь вы можете настроить поведение приложения - то что хотели бы не показывать">
            <template v-slot:right="{item, index}">
              <Toggle v-model="toggles[index]" />
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
