<script setup>
import VDoc from '@/Partials/Doc.vue';
import store from '~/store/orders/documents';
import useConfirmDialog from '~/composables/useConfirmDialog';

const { state, loadTemplates, handleDocToggle, dropTemplate } = store;
const { drop } = useConfirmDialog()

await loadTemplates();

</script>

<template>
  <div>
    <v-doc
      v-for="(doc,i) in state.templates"
      :key="doc.id"
      :label="doc.name"
      @toggled="() => handleDocToggle(i)"
      @dropped="() => drop(() => dropTemplate(doc.id))"
      :selected="state.selectedTemplates.indexOf(i) !== -1"
    />

    <h2 v-if="!state.templates.length" class="text-center mb-3 font-bold text-gray-700">Шаблоны не найдены, загрузите шаблон</h2>
  </div>
</template>
