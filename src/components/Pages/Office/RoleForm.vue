<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import { useRouter, useRoute } from 'vue-router';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import Spinner from '@/UI/Spinner.vue';
import rolesService from '~/services/roles.js';
import roleForm from '~/services/roleForm.js';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import RolePermissions from '~/components/Partials/RolePermissions.vue';

const { openConfirmDialog } = useConfirmDialog();

const { dropRole } = rolesService();

const { v$, isEditRolePage, saveRole, roleTitle } = roleForm();

const route = useRoute();
const router = useRouter();

// const editor = "Текст задачи";
</script>

<template>
  <OfficeLayout title="Создание новой роли">
    <template #actions>
      <Button type="secondary" link="/roles">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />
        Вернуться
      </Button>

      <Button color="green" @click="saveRole">
        <CheckIcon class="w-5 h-5 mr-1" />
        Сохранить
      </Button>

      <Button
        color="red"
        @click="
          () =>
            openConfirmDialog(
              () => {
                dropRole(route.params.id);
                router.back();
              },
              'are you sure you want to delete',
              'delete ?'
            )
        "
        v-if="isEditRolePage"
      >
        <XIcon class="w-5 h-5 mr-1" />
        Удалить
      </Button>
    </template>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 sm:col-span-4">
        <Input
          label="Название"
          v-model="roleTitle"
          :required="true"
          :error="v$.roleTitle.$errors[0]?.$message"
          @input="v$.roleTitle.$touch"
        />
      </div>

      <Suspense>
        <RolePermissions />

        <template #fallback>
          <div class="col-span-12 sm:col-span-12 flex justify-center">
            <Spinner h="4" w="4">
              <span class="text-sm text-gray-600">fetching permissions...</span>
            </Spinner>
          </div>
        </template>
      </Suspense>
    </div>
  </OfficeLayout>
</template>

<style scoped></style>
