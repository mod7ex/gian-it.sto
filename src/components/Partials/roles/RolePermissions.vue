<script setup>
import { computed } from 'vue';
import Toggle from '@/UI/Toggle.vue';
import service from '~/services/roles/roleForm.js';
import useAppRouter from '~/composables/useAppRouter.js';

const { router, route } = useAppRouter();

const { rawRolePermissions, permissions, atMountedRoleForm, role } = service();

await atMountedRoleForm();

</script>

<template>
  <div class="col-span-12 sm:col-span-12 divide-y">
    <!-- <div v-for="(field, i) in rawRolePermissions" :key="i" class="my-6"> -->
    <div v-for="(field, i) in rawRolePermissions" :key="i" class="my-6">
      <div class="my-3">{{ field.title }}</div>
      <div class="grid auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pl-16" >
        <Toggle :disabled="role.name === 'admin'" v-for="perm in field.permissions" :key="perm.id" :label="perm.title" v-model="permissions[perm.id]" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
