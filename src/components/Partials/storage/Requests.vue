<script setup>
// import Link from '@/UI/Link.vue'
import store from '~/store/orders/storage-requests';
import departmentStore from '~/store/departments';
import {timeSince, sto_parse_DMY_T} from '~/helpers'

const { load, state } = store;
const { current } = departmentStore;

await load({ department_id: current.value });

</script>

<template>
  <div :class="$attrs.class" class="w-full h-full">
    <ul>
      <li
        v-for="(item, i) in state.raw"
        :key="item.id"
        :class="(i&1) ? 'bg-white' : 'bg-gray-100'"
        class="p-2 flex items-center justify-between hover:bg-blue-200 transition-colors duration-300 text-xs"
      >
        <p>{{ item.product?.name }}</p>
        <p>{{ item.count }}</p>
        <p>{{ timeSince(sto_parse_DMY_T(item.created_at)) }}</p>
      </li>
    </ul>
  </div>
</template>