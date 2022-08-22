<script setup>
import useSuspense from '~/composables/useSuspense';
import WorkersList from '@/Pages/Work/WorkersList.vue';

const SuspenseArea = useSuspense(WorkersList);

</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center p-6 lg:p-0">
    <suspense-area />
  </div>
</template>
