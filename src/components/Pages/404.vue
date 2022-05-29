<script setup>
import OfficeLayout from '@/Layout/Office.vue';
</script>

<template>
  <OfficeLayout title="Oops page not found !" main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto">
    <template #content>
        <div class="min-h-full flex items-center justify-start flex-col max-h-28 pt-40">
            <h1 class="text-9xl text-red-500">404 !</h1>
            <button class="bg-green-700 py-3 px-5 rounded-md text-white text-xl mt-6">
              <router-link :to="{name: 'Dashboard'}">Dashboard</router-link>
            </button>
        </div>
    </template>
  </OfficeLayout>
</template>
