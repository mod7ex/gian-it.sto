<script setup>
import { PlusCircleIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import { ref, onMounted } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Table from '@/Partials/funnels/stages/Table.vue';
import form from '~/services/funnels/stage';
import $ from '~/helpers/fetch';
import useAppRouter from '~/composables/useAppRouter';

const { route: { params: { id } } } = useAppRouter();

const { render } = form(id);

const SuspenseTable = useSuspense(Table);

const pipeline = ref();

onMounted(async () => {
  pipeline.value = await $.pipeline(id);
});

</script>

<template>
    <OfficeLayout :title="`Все этапы ${pipeline?.name ?? ''}`">
      <template #actions>
        <Button type="secondary" :link="{ name: 'Funnels' }">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>К воронкам
        </Button>

        <Button color="blue" @click="() => render()">
          <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
        </Button>
      </template>

      <suspense-table loadingMsg="получение этапов..." />

    </OfficeLayout>
</template>
