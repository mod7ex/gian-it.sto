<script setup>
import { watch } from 'vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/orders';
import userStore from '~/store/employees';

const { options, load } = userStore;

const { filter, current } = service();

watch(current, (department_id) => { load({ department_id }); }, { immediate: true });

</script>

<template>
    <!-- Filter -->
    <div class="flex flex-wrap gap-2 items-end" v-if="filter">
      <!-- <Input label="Название"/> -->

      <Input label="Дата от" type="date" v-model="filter.created_after" />
      <Input label="Дата до" type="date" v-model="filter.created_before" />

      <div class="w-full user">
        <Select
          label="Исполнитель"
          v-model="filter.user_id"
          :options="options"
          class="w-full"
        />
      </div>
    </div>
</template>

<style>
.user {
  max-width: 300px;
}
</style>
