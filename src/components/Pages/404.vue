<script setup>
import OfficeLayout from '@/Layout/Office.vue';
</script>

<template>
  <OfficeLayout title="Oops page not found" main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto">
    <template #content>
        <div class="min-h-full flex items-center justify-center">
            <h1 class="text-9xl text-red-600">404 !</h1>
        </div>
    </template>
  </OfficeLayout>
</template>
