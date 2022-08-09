<script setup>
import { CheckIcon, ArrowLeftIcon, XIcon } from '@heroicons/vue/outline';
import { computed } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Input from '@/UI/Input.vue';
import rolesService from '~/services/roles/roles.js';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import useAppRouter from '~/composables/useAppRouter.js';
import RolePermissions from '~/components/Partials/roles/RolePermissions.vue';
import useSuspense from '~/composables/useSuspense.js';
import service from '~/services/roles/roleForm.js';

const { drop } = useConfirmDialog();

const { dropRole } = rolesService();
const { route } = useAppRouter();

const { v$, isEditRolePage, saveRole, role } = service();

const SuspensRolePermissions = useSuspense(RolePermissions);

const isAdmin = computed(() => (role.name === 'admin'));

</script>

<template>
  <OfficeLayout title="Создание новой роли">
    <template #actions>
      <Button type="secondary" :link="{name: 'Roles'}">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />Вернуться
      </Button>

      <Button color="green" @click="saveRole" :disabled="isAdmin">
        <CheckIcon class="w-5 h-5 mr-1" />Сохранить
      </Button>

      <Button
        color="red"
        @click="() => drop(() => dropRole(route.params.id))"
        v-if="isEditRolePage && !isAdmin"
      >
        <XIcon class="w-5 h-5 mr-1" />Удалить
      </Button>
    </template>

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 sm:col-span-4">
        <Input
          :disabled="isAdmin"
          label="Название"
          v-model="role.title"
          :required="true"
          :error="v$.title.$errors[0]?.$message"
          @input="v$.title.$touch"
        />
      </div>

      <SuspensRolePermissions loadingMsg="fetching permissions..." />
    </div>
  </OfficeLayout>
</template>
