<script setup>
import { ref, computed } from 'vue';
import { DocumentTextIcon, EyeIcon, TrashIcon, PlusCircleIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Link from '@/UI/Link.vue';
import VDocs from '@/Layout/modal/Docs.vue';
import DocPreview from '@/Layout/modal/DocPreview.vue';
import Table from '@/Layout/Table.vue';
import Badge from '@/UI/Badge.vue';
import service from '~/services/orders/template';
import store from '~/store/orders/documents';
import Templates from '~/components/Partials/orders/items/Templates.vue';
import useSuspense from '~/composables/useSuspense';

const SuspenseArea = useSuspense(Templates);

const { render } = service();

const { state, handleDocToggle } = store;

const templates = computed(() => state.selectedTemplates.map((i) => state.templates[i]));

const isUp = ref(false);

const toVisualize = ref();

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Посмотреть', key: 'view' }, // fake keys
  { label: 'Удалить', key: 'drop' }, // fake keys
];

</script>

<template>
  <div>
      <div class="mb-5">
        <Button color="blue" class="mr-3" @click="isUp = true">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Добавить документ
        </Button>

        <Button color="blue" class="mr-3" @click="() => render()">
          <DocumentTextIcon class="w-5 h-5 mr-1"/>Загрузить шаблон
        </Button>
      </div>

      <!-- List of templates preview  -->
      <Teleport to="#sto-modal-teleport">
        <v-docs :open="isUp" @close="isUp = false" @outclick="isUp = false" >
          <suspense-area />
        </v-docs>
      </Teleport>

      <!-- Document preview  -->
      <Teleport to="#sto-modal-teleport">
        <doc-preview :open="toVisualize != null" @close="toVisualize = null" >
          <div class="max-h-screen" :key="toVisualize" v-html="templates[toVisualize].template" />
        </doc-preview>
      </Teleport>

      <Table
          :fields="fields"
          :items="templates"
          :actions="false"
      >
          <!-- Body -->

          <template #td-name="{ value }" >
            <span class="max-w-md w-full inline-block"><Badge :point="true" color="blue" class="text-sm">{{ value }}</Badge></span>
          </template>

          <template #td-view="{ index }" >
            <Link @click="toVisualize = index">
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
