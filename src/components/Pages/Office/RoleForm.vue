<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import rolesService from '~/services/roles.js';
import roleForm from '~/services/roleForm.js';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useAppRouter from '~/composables/useAppRouter.js';
import RolePermissions from '~/components/Partials/roles/RolePermissions.vue';
import useSuspense from '~/composables/useSuspense.js';

const dialogger = useConfirmDialog();

const { dropRole } = rolesService();
const { route } = useAppRouter();

const { v$, isEditRolePage, saveRole, roleTitle } = roleForm();

// const editor = "Текст задачи";

const SuspensRolePermissions = useSuspense(RolePermissions);

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
        @click="() => dialogger.drop(() => dropRole(route.params.id), 'продолжить удаление!', 'Удалить ?')"
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

      <SuspensRolePermissions loadingMsg="fetching permissions..." />
    </div>
  </OfficeLayout>
</template>
