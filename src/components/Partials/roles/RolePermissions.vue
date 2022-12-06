<script setup>
import { computed } from 'vue';
import Toggle from '@/UI/Toggle.vue';
import service from '~/services/roles/roleForm.js';
import useToast from '~/composables/useToast';

const { warn } = useToast();

const { rawRolePermissions, permissions, atMountedRoleForm, role } = service();

await atMountedRoleForm();

const isDisabled = ({ id }) => {
  if (role.name === 'admin') return true;

  if (id === 'crud orders') {
    return !permissions.value['read department tasks'];
  }

  return false;
};

const foo = (state, { id }) => {
  if (id === 'read department tasks' && !state) {
    if (permissions.value['crud orders']) {
      permissions.value['crud orders'] = false;
    }
  }

  if (id === 'crud orders') {
    console.log(permissions.value['read department tasks']);
    if (!permissions.value['read department tasks']) {
      warn(" Для включения, необходимо добавить просмотр задач своего отделения", '')
    }
  }
};

</script>

<template>
  <div class="col-span-12 sm:col-span-12 divide-y">
    <!-- <div v-for="(field, i) in rawRolePermissions" :key="i" class="my-6"> -->
    <div v-for="(field, i) in rawRolePermissions" :key="i" class="my-6">
      <div class="my-3">{{ field.title }}</div>
      <div class="grid auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pl-16" >
        <!-- <Toggle :disabled="role.name === 'admin'" v-for="perm in field.permissions" :key="perm.id" :label="perm.title" v-model="permissions[perm.id]" /> -->
        <div v-for="perm in field.permissions" :key="`${perm.id}-${permissions[perm.id] ? 'on' : 'off'}`">
          <Toggle
            :label="perm.title"
            :disabled="isDisabled(perm)"
            v-model="permissions[perm.id]"
            @update:modelValue="e => foo(e, perm)"
          />
          <!-- {{ perm.id }}<br>{{ permissions[perm.id] }} -->
        </div>
      </div>
    </div>
  </div>
</template>
