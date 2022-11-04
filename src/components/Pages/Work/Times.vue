<script setup>
import { computed, onMounted, onScopeDispose, shallowRef, watch } from 'vue';
import Layout from '@/Layout/Work.vue';
import Header from '@/UI/Header.vue';
import Input from '@/UI/Input.vue';
import WorkerBadge from '~/components/Partials/WorkerBadge.vue';
import useSuspense from '~/composables/useSuspense';
import RawTimes from '@/Pages/Work/RawTimes.vue';
import service from '~/services/tasks/worker';
import Select from '@/UI/Select.vue';
import { debounce, hyphenatedDateFormat } from '~/helpers';
import userStore from '~/store/employees';

const { options: users, load } = userStore;

const { clearMemo, initTimeEdges, options, selection, loadFunnels, funnelById } = service();

const SuspenseArea = useSuspense(RawTimes);

onScopeDispose(clearMemo);

const edge = initTimeEdges();

const stageOptions = computed(() => funnelById(selection.funnel)?.stages.map(({ id, name }) => ({ label: name, value: id })));

const key = shallowRef('');

onMounted(async () => {
  await loadFunnels();
  await load();
  selection.funnel = options.value[0]?.value;
  selection.user = users.value[0]?.value;
  watch(selection, debounce(() => { key.value = `${selection.funnel}-${selection.user}`; }));
});

</script>

<template>
  <Layout title="Рабочее время">

    <worker-badge />

    <Header>Рабочее время</Header>

    <div class="flex flex-wrap gap-2 items-end mt-4">
      <Input label="Дата от" v-model="edge.from" type="date" :max="hyphenatedDateFormat(new Date(edge.to))" />
      <Input label="Дата до" v-model="edge.to" type="date" :max="hyphenatedDateFormat(new Date())" :min="hyphenatedDateFormat(new Date(edge.from))" />
      <Select label="Сотрудник" :options="users" v-model="selection.user" class="col-span-4" />
      <Select label="Воронка" :options="options" v-model="selection.funnel" class="col-span-4" />
      <Select label="Этап" :options="stageOptions" v-model="selection.etape" class="col-span-4" />
    </div>

    <suspense-area v-if="selection.user" :key="key" />

  </Layout>
</template>
