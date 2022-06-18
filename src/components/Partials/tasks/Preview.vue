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
import Link from '@/UI/Link.vue';
import Comments from '@/Partials/Comments.vue';
import service from '~/services/tasks/task';

const { atMounted, task } = service();

// await atMounted();

const tasks = ref([
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit mollitia quasi reprehenderit tempore voluptates! Culpa cumque delectus deleniti dicta dolor ea eos eum facere',
    checked: true,
  },
  {
    id: 2,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. facere',
    checked: false,
  },
  {
    id: 3,
    text: 'Culpa cumque delectus deleniti dicta dolor ea eos eum facere harum incidunt ipsam magni molestias natus odit, pariatur quidem reiciendis repellendus, unde vero voluptatum. Aliquid cupiditate distinctio enim et magnam numquam odit rerum sunt totam, vitae',
    checked: false,
  },
  {
    id: 4,
    text: 'Lorem ipsum dolor sit amet',
    checked: false,
  },
]);
</script>

<template>
<div>
    <Card>
        <template #header>
            <div class="flex gap-3 flex-wrap justify-between items-center">
                <Avatar
                    title="Иван Шариков"
                    subtitle="Менеджер"
                    image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                />

                <div class="text-right">
                    <div class="text-sm flex items-center">
                        <ClockIcon class="w-4 h-4 mr-1"/>
                        <span class="mr-1">Крайний срок:</span>
                        <span class="text-gray-500">17.07.2022 17:30</span>
                    </div>

                    <Badge :point="true" color="yellow">Выполняется</Badge>
                </div>
            </div>
        </template>

        <template #footer>
            <h2 class="font-bold">Прикреплённые файлы</h2>
            <ul class="mt-2">
                <li
                    class="p-3 text-sm border rounded my-2"
                    v-for="file in task.files ?? [
                        {name: 'Название файла 1.docx'},
                        {name: 'Название файла 2.pptx'},
                        {name: 'Название файла 3.txt'}
                    ]"
                    :key="file.name"
                >
                    <Link class="flex items-center">
                        <PaperClipIcon class="w-4 h-4 mr-1"/>
                        <span>{{ file.name }}</span>
                    </Link>
                </li>
            </ul>
        </template>

        <div>
            <h2 class="font-bold">Текст задачи</h2>
            <p>{{ task.description ?? 'lorem ipsum' }}</p>
        </div>

        <div class="mt-4">
            <h2 class="font-bold">Чек лист</h2>
            <ul>
                <li
                    v-for="item in task.checkboxes ?? []"
                    :key="item.id"
                    :class="['py-2', {'line-through': item.checked}]"
                >
                    <Checkbox :label="item.text" v-model="item.checked" />
                </li>
            </ul>
            <span class="mt-4 text-sm text-gray-400" v-if="task?.checkboxes?.length">
                Выполнено: {{ task?.checkboxes?.filter(e => e.checked).length }} из {{ task?.checkboxes?.length }}
            </span>
        </div>
    </Card>

    <Comments class="mt-2" />
</div>
</template>
