<script setup>
import Toggle from "@/UI/Toggle.vue";
import useRoles from "~/composables/useRoles.js";

let { fetchRawRolePermissions, rawRolePermissions, permissions } = useRoles();

await fetchRawRolePermissions();
</script>

<template>
  <div class="col-span-12 sm:col-span-12 divide-y">
    <div v-for="(field, i) in rawRolePermissions" :key="i" class="my-6">
      <div class="mb-3">{{ field.title }}</div>
      <div
        class="grid auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pl-16"
      >
        <Toggle
          v-for="(perm, i) in field.permissions"
          :key="perm.id"
          :label="perm.title"
          v-model="permissions[perm.id]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
