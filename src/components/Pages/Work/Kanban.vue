<script setup>
import { onScopeDispose, onMounted, watch } from 'vue';
import Layout from '@/Layout/Work.vue';
import Header from '@/UI/Header.vue';
import Select from '@/UI/Select.vue';
import WorkerBadge from '~/components/Partials/WorkerBadge.vue';
import useSuspense from '~/composables/useSuspense';
import KanBan from '@/Pages/Work/RawKanban.vue';
import service from '~/services/tasks/kanban';
import useLocalStorage from '~/composables/useLocalStorage';

const SuspenseArea = useSuspense(KanBan);

const { clearMemo, options, theSelectedFunnel, loadFunnels } = service();

onScopeDispose(clearMemo);

onMounted(async () => {
  await loadFunnels();

  const [value, setValue] = useLocalStorage(
    'kanban_funnel',
    options.value[0]?.value,
  );

  theSelectedFunnel.value = value.value;

  watch(theSelectedFunnel, setValue);
});
</script>

<template>
  <Layout title="Канбан">
    <worker-badge />

    <Header>Канбан</Header>

    <div class="grid grid-cols-12">
      <Select
        :options="options"
        v-model="theSelectedFunnel"
        class="col-span-4 mb-0"
      />
    </div>

    <suspense-area v-if="theSelectedFunnel" :key="theSelectedFunnel" />
  </Layout>
</template>
