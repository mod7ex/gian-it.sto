<script setup>
import { RefreshIcon } from '@heroicons/vue/outline';
import OfficeLayout from '@/Layout/Office.vue';

</script>

<template>
  <OfficeLayout title="Oops page not found !" main-classes="flex flex-col min-w-0 flex-1 md:overflow-hidden overflow-auto">
    <template #content>
        <div class="min-h-full flex items-center justify-center flex-col max-h-28">

            <button class="p-2 border-2 rounded-full">
              <router-link :to="{name: 'Dashboard'}">
                <RefreshIcon class="text-gray-500 h-20 w-2h-20" />
              </router-link>
            </button>

        </div>
    </template>
  </OfficeLayout>
</template>
