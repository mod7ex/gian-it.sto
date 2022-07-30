<script setup>
import Link from '@/UI/Link.vue'
import store from '~/store/orders/storage-requests';
import departmentStore from '~/store/departments';
import {timeSince, sto_parse_DMY_T} from '~/helpers'

const { load, state } = store;
const { current } = departmentStore;

const requests = [
  {
    created_at: '03.02.2022 11.36',
    product_name: 'lorum poduct 1',
    count: 35,
  },

  {
    created_at: '10.02.2022 11.36',
    product_name: 'lorum poduct 2',
    count: 2,
  },

  {
    created_at: '23.08.2022 11.36',
    product_name: 'lorum poduct 3',
    count: 12,
  },
];

await load({ department_id: current.value });

</script>

<template>
  <div :class="$attrs.class">
    <ul>
      <li
        v-for="(item, i) in requests"
        :key="item.product_name"
        :class="(i&1) ? 'bg-white' : 'bg-gray-100'"
        class="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300 text-xs"
      >
        <Link :href="'#'">{{ item.product_name }}</Link>
        <p>{{ item.count }}</p>
        <p>{{ timeSince(sto_parse_DMY_T(item.created_at)) }}</p>
      </li>
    </ul>
  </div>
</template>