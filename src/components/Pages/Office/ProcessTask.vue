<script setup>
import { CheckIcon, ClockIcon, PencilIcon, ArrowLeftIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import useSuspense from '~/composables/useSuspense';
import Preview from '@/Partials/processes/Preview.vue';
import useAppRouter from '~/composables/useAppRouter.js';
import store from '~/store/departments';
// import save from '~/helpers/save';
// import { hyphenatedDateFormat } from '~/helpers';
// import useToast from '~/composables/useToast.js';

const SuspenseArea = useSuspense(Preview);

// const toaster = useToast();
const { route, back } = useAppRouter();
const { current } = store;

// const key = ref('now');

const process_category = route.params.id;
const task_id = route.params.task;

// const ping = async (start) => {
//   const path = `tasks/${task_id}/to/${start ? 'process' : 'done'}`;
//   const { success, message } = await save({ path, data: { [`${start ? 'start' : 'end'}_at`]: hyphenatedDateFormat(new Date()) } });
//   if (success) key.value = Date.now();
//   const msg = message ?? (success ? 'Статус успешно изменен' : 'Не удалось изменить статус задача');
//   toaster[success ? 'success' : 'danger'](msg);
// };

</script>

<template>
  <OfficeLayout :title="`${route.params.name}`">
    <template #actions>
        <Button type="secondary" @click="() => back()">
          <ArrowLeftIcon class="w-5 h-5 mr-1"/>Вернуться
        </Button>

        <!--
          <Button color="purple" @click="() => ping(true)">
            <ClockIcon class="w-5 h-5 mr-1"/>Начать
          </Button>

          <Button color="green" @click="() => ping(false)">
            <CheckIcon class="w-5 h-5 mr-1"/>Завершить
          </Button>
        -->

        <Button color="blue" :link="{name: 'ProcessTaskEdit', params: {id: process_category, task: task_id} }">
          <PencilIcon class="w-5 h-5 mr-1"/>Изменить
        </Button>
    </template>

    <suspense-area :key="`${key}-${current}`"  />

  </OfficeLayout>
</template>
