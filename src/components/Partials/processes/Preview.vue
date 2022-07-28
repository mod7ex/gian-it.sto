<script setup>
import {
  ClockIcon,
  PaperClipIcon,
} from '@heroicons/vue/outline';
import { ref } from 'vue';
import Card from '@/UI/Card.vue';
import Avatar from '@/UI/Avatar.vue';
import Checkbox from '@/UI/Checkbox.vue';
import Badge from '@/UI/Badge.vue';
import useAppRouter from '~/composables/useAppRouter.js';
import { tasksColorMap, debounce } from '~/helpers';
import $ from '~/helpers/fetch.js';
import save from '~/helpers/save';
import useToast from '~/composables/useToast';

const toaster = useToast();

const { route, back } = useAppRouter();

const process_task = ref({});

const atMounted = async () => {
  const { task } = route.params;

  process_task.value = await $.process_task(task);

  console.log(process_task.value);

  if (!process_task.value.id) back();
};

const checkBox = debounce(async (_id, is_checked, i) => {
  const { success, message } = await save({ path: `process-tasks/checkboxes/${_id}`, data: { is_checked } });
  if (!success) {
    toaster.danger(message ?? 'Не удалось изменить статус флажка');
    process_task.value.checkboxes[i].is_checked = !is_checked;
  }
});

await atMounted();

</script>

<template>
<div>
    <Card >
        <template #header>
            <div class="flex gap-3 flex-wrap justify-between items-center">
                <h1 class="font-bold">Роль: {{ process_task.role.title }}</h1>

                <div class="text-right">
                    <Badge :point="true" :color="blue">{{ process_task.time }} Ч</Badge>
                </div>
            </div>
        </template>

        <template #footer v-if="process_task.files?.length">
            <h2 class="font-bold">Прикреплённые файлы</h2>
            <ul class="mt-2">
                <li
                    class="p-3 text-sm border rounded my-2 flex items-center font-medium text-blue-600 hover:text-blue-500"
                    v-for="file in process_task.files"
                    :key="file.name"
                >
                    <PaperClipIcon class="w-4 h-4 mr-1"/>
                    <a :href="file.url" target="_blank" >{{ file.name }}</a>
                </li>
            </ul>
        </template>

        <div>
            <h2 class="font-bold">Текст задачи</h2>
            <p v-html="process_task.description" />
        </div>

        <div class="mt-4">
            <h2 class="font-bold">Чек лист</h2>
            <ul>
                <li
                    v-for="(item, i) in process_task.process_checkboxes ?? []"
                    :key="item.id"
                    :class="['py-2', {'line-through': item.is_checked}]"
                >
                    <Checkbox
                        :label="item.description"
                        v-model="item.is_checked"
                        @clicked="() => checkBox(item.id, !item.is_checked, i)"
                    />
                </li>
            </ul>
            <span class="mt-4 text-sm text-gray-400" v-if="process_task?.checkboxes?.length">
                Выполнено: {{ process_task?.checkboxes?.filter(e => e.is_checked).length }} из {{ process_task?.checkboxes?.length }}
            </span>
        </div>
    </Card>
</div>
</template>
