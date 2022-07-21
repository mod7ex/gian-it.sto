<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { DocumentTextIcon, EyeIcon, TrashIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Link from '@/UI/Link.vue';
import VDocs from '@/Layout/modal/Docs.vue';
import DocPreview from '@/Layout/modal/DocPreview.vue';
import VDoc from '@/Partials/Doc.vue';
import Table from '@/Layout/Table.vue';
import Badge from '@/UI/Badge.vue';

const docs = [
  { id: 'Заказ наряд', component: defineAsyncComponent(() => import('@/templates/Order.vue')) },
  { id: 'Акт выполненных работ', component: defineAsyncComponent(() => import('@/templates/Completion.vue')) },
  { id: 'Акт приема передачи автомобиля', component: defineAsyncComponent(() => import('@/templates/Reception.vue')) },
];

const isUp = ref(false);

const selectedDocs = ref([]);

const toVisualize = ref();

const handleDocToggle = (i, locally) => {
  const index = selectedDocs.value.indexOf(i);

  if (index !== -1 || locally) {
    selectedDocs.value.splice(index, 1);
    return;
  }

  selectedDocs.value.push(i);
};

const fields = [
  { label: 'Название', key: 'id' },
  { label: 'Посмотреть', key: 'view' },
  { label: 'Удалить', key: 'drop' },
];

</script>

<template>
  <div>
      <div class="mb-5">
        <Button color="blue" @click="isUp = true">
          <DocumentTextIcon class="w-5 h-5 mr-1"/>Добавить документ
        </Button>
      </div>

      <Teleport to="#sto-modal-teleport">
        <v-docs :open="isUp" @close="isUp = false" @outclick="isUp = false" >
          <v-doc v-for="(doc,i) in docs" :key="doc.id" :label="doc.id" @toggled="() => handleDocToggle(i)" :selected="selectedDocs.indexOf(i) !== -1" />
        </v-docs>
      </Teleport>

      <Teleport to="#sto-modal-teleport">
        <doc-preview :open="toVisualize != null" @close="toVisualize = null" >
          <!-- undefined is included (:) -->
          <component  :is="docs[toVisualize].component" class="max-h-screen" />
        </doc-preview>
      </Teleport>

      <Table
          :fields="fields"
          :items="selectedDocs"
          :actions="false"
      >
          <!-- Body -->

          <template #td-id="{ item }" >
            <span class="max-w-md w-full inline-block"><Badge :point="true" color="blue" class="text-sm">{{ docs[item].id }}</Badge></span>
          </template>

          <template #td-view="{ item }" >
            <Link @click="toVisualize = item">
              <EyeIcon class="text-blue-600 h-6 hover:text-blue-900" />
            </Link>
          </template>

          <template #td-drop="{ item }" >
            <Link @click="() => handleDocToggle(item, true)">
              <TrashIcon class="text-blue-600 h-6 hover:text-blue-900" />
            </Link>
          </template>

          <!-- ****** -->
      </Table>
  </div>
</template>
