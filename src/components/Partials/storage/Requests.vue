<script setup>
// import { PlusCircleIcon, CogIcon, BellIcon } from '@heroicons/vue/outline';
// import Button from '@/UI/Button.vue';
// import useSuspense from '~/composables/useSuspense';
// import Table from '@/Partials/storage/Table.vue';
// import form from '~/services/storage/form';
// import departmentStore from '~/store/departments';

const requests = [
  {
    created_at: '03.02.2022',
    product_name: 'lorum poduct 1',
    count: 35,
  },

  {
    created_at: '10.02.2022',
    product_name: 'lorum poduct 2',
    count: 2,
  },

  {
    created_at: '23.08.2022',
    product_name: 'lorum poduct 3',
    count: 12,
  },
];

</script>

<template>
  <div :class="$attrs.class" class=""  id="sto-requests">
    <ul>
      <li v-for="(item, i) in requests" :key="item.product_name" :class="(i&1) ? 'bg-white' : 'bg-gray-100'" class="p-3 flex items-center justify-between">
        <p>{{ item.product_name }}</p>
        <p>{{ item.count }}</p>
        <p>{{ item.created_at }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#sto-requests {
  width: 300px;
}
</style>
