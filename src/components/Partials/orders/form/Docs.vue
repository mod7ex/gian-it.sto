<script setup>
import { ref } from 'vue';
// import { DocumentTextIcon } from '@heroicons/vue/outline';
// import Button from '@/UI/Button.vue';
import DocPreview from '@/Layout/modal/DocPreview.vue';
import service from '~/services/orders/template';
import useSuspense from '~/composables/useSuspense';
import DocsTable from '@/Partials/orders/items/Docs.vue';
import useAppRouter from '~/composables/useAppRouter';

const SuspenseArea = useSuspense();

const { route } = useAppRouter();
const { clearMemo, foo, state } = service(route.params.id);

clearMemo();

const toVisualize = ref();

</script>

<template>
  <div>
<!--
      <v-can ability="crud document templates" class="mb-5">
        <Button color="blue" class="mr-3" @click="() => render()">
          <DocumentTextIcon class="w-5 h-5 mr-1"/>Загрузить шаблон
        </Button>
      </v-can>
-->

      <!-- Document preview  -->
      <Teleport to="#sto-modal-teleport">
        <doc-preview :open="toVisualize != null" @close="toVisualize = null" >
          <div class="max-h-screen" :key="toVisualize" v-html="state.templates[toVisualize].template" />
        </doc-preview>
      </Teleport>

      <suspense-area >
        <!-- <docs-table @preveiw="(i) => (toVisualize = i)" @download="(i) => {}" /> -->
        <!-- <docs-table @preveiw="(i) => foo(i)" @download="(i) => {}" /> -->
      </suspense-area>
  </div>
</template>
