<script setup>
import { ClockIcon, PaperClipIcon } from '@heroicons/vue/outline';
import Card from '@/UI/Card.vue';
import Avatar from '@/UI/Avatar.vue';
import Checkbox from '@/UI/Checkbox.vue';
import Badge from '@/UI/Badge.vue';
import Comments from '@/Partials/Comments.vue';
import { tasksColorMap } from '~/helpers';
import service from '~/services/tasks/preview';

const { task, atMounted, route, checkBox, canTasks } = service();

await atMounted();

</script>

<template>
<div>
    <Card>
        <template #header>
            <div class="flex gap-3 flex-wrap justify-between items-center">
                <Avatar
                    :title="`${task.author.name} ${task.author.surname}`"
                    :subtitle="task.author.office_position"
                    :image="task.author.avatar"
                />

                <div class="text-right">
                    <div class="text-sm flex items-center mb-3">
                        <ClockIcon class="w-4 h-4 mr-1"/>
                        <span class="mr-1">Крайний срок:</span>
                        <span class="text-gray-500">{{ task.deadline_at }}</span>
                    </div>

                    <Badge :point="true" :color="tasksColorMap[task.status].color">{{ tasksColorMap[task.status].label }}</Badge>
                </div>
            </div>
        </template>

        <template #footer v-if="task.files?.length">
            <h2 class="font-bold">Прикреплённые файлы</h2>
            <ul class="mt-2">
                <li
                    class="p-3 text-sm border rounded my-2 flex items-center font-medium text-blue-600 hover:text-blue-500"
                    v-for="file in task.files"
                    :key="file.name"
                >
                    <PaperClipIcon class="w-4 h-4 mr-1"/>
                    <a :href="file.url" target="_blank" >{{ file.name }}</a>
                </li>
            </ul>
        </template>

        <div>
            <h2 class="font-bold">Текст задачи</h2>
            <p v-html="task.description" />
        </div>

        <div class="mt-4">
            <h2 class="font-bold">Чек лист</h2>
            <ul>
                <li
                    v-for="(item, i) in task.checkboxes ?? []"
                    :key="item.id"
                    :class="['py-2', {'line-through': item.is_checked}]"
                >
                    <Checkbox
                        :disabled="!canTasks(task, 'update')"
                        :label="item.description"
                        v-model="item.is_checked"
                        @clicked="() => checkBox(item.id, !item.is_checked, i)"
                    />
                </li>
            </ul>
            <span class="mt-4 text-sm text-gray-400" v-if="task?.checkboxes?.length">
                Выполнено: {{ task?.checkboxes?.filter(e => e.is_checked).length }} из {{ task?.checkboxes?.length }}
            </span>
        </div>
    </Card>

    <Comments model="task" :id="route.params.id" class="mt-2" :disabled="!canTasks(task, 'update')" />
</div>
</template>
