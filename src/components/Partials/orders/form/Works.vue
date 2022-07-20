<script setup>
import { ChipIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import Button from '@/UI/Button.vue';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import FormModal from '@/Layout/modal/Form.vue';
import useSuspense from '~/composables/useSuspense';
import RawForm from '@/Partials/orders/form/Raw/Work.vue';
import Table from '@/Layout/Table.vue';

const SuspenseArea = useSuspense();

const isUp = ref(false);

const works = ref([]);

const fields = [
  { label: 'Название', key: 'id' },
  { label: 'Исполнитель', key: 'user' },
  { label: 'Цена', key: 'price' },
];

</script>

<template>
    <div>
      <div class="mb-5">
        <Button color="blue" @click="isUp = true">
          <ChipIcon class="w-5 h-5 mr-1"/>Добавить работу
        </Button>
      </div>

      <Teleport to="#sto-modal">
        <form-modal :open="isUp" @close="isUp = false" >
          <template #title >
            <h1 class="text-center p-3 text-lg text-gray-700" >Создать работу</h1>
          </template>
          <suspense-area >
            <raw-form />
          </suspense-area>
        </form-modal>
      </Teleport>

      <Table
        :fields="fields"
        :items="works"
      >
          <!-- Body -->

          <template #td-id="{ item }" >
            <Badge :point="true" color="blue" class="text-sm">{{ docs[item].id }}</Badge>
          </template>

          <template #td-view="{ item }" >
            <Link @click="toVisualize = item">Посмотреть</Link>
          </template>

          <template #td-drop="{ item }" >
            <Link @click="() => handleDocToggle(item, true)">Удалить</Link>
          </template>

          <!-- ****** -->
      </Table>
    </div>
</template>
