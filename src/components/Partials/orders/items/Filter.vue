<script setup>
import { onMounted, watch } from 'vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/orders';
import userStore from '~/store/employees';
import pipelineStore from '~/store/pipelines/index';

const { options, load } = userStore;

const { typesOptions, loadTypes } = pipelineStore;

const { filter, current } = service();

watch(current, (department_id) => { load({ department_id }); }, { immediate: true });

onMounted(loadTypes);

</script>

<template>
    <!-- Filter -->
    <div class="flex flex-wrap gap-2 items-end" v-if="filter">
      <!-- <Input label="Название"/> -->

      <Input label="Дата от" type="date" v-model="filter.created_after" />
      <Input label="Дата до" type="date" v-model="filter.created_before" />

      <div>
        <Select
          label="Исполнитель"
          v-model="filter.user_id"
          :options="options"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Тип"
          v-model="filter.type"
          :options="typesOptions"
          class="w-44"
        />
      </div>
    </div>
</template>
