<script setup>
import { onScopeDispose } from 'vue';
import Layout from '@/Layout/Work.vue';
import Header from '@/UI/Header.vue';
import Input from '@/UI/Input.vue';
import WorkerBadge from '~/components/Partials/WorkerBadge.vue';
import useSuspense from '~/composables/useSuspense';
import RawTimes from '@/Pages/Work/RawTimes.vue';
import service from '~/services/tasks/worker';
import { hyphenatedDateFormat } from '~/helpers';

const { clearMemo, initTimeEdges } = service();

const SuspenseArea = useSuspense(RawTimes);

onScopeDispose(clearMemo);

const edge = initTimeEdges();

</script>

<template>
  <Layout title="Рабочее время">

    <worker-badge />

    <Header>Рабочее время</Header>

    <div class="flex flex-wrap gap-2 items-end mt-4">
      <Input label="Дата от" v-model="edge.from" type="date" :max="hyphenatedDateFormat(new Date(edge.to))" />
      <Input label="Дата до" v-model="edge.to" type="date" :max="hyphenatedDateFormat(new Date())" :min="hyphenatedDateFormat(new Date(edge.from))" />
    </div>

    <suspense-area />

  </Layout>
</template>
