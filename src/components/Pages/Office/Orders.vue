<script setup>
import { PlusCircleIcon, ViewBoardsIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';
import Draggable from 'vuedraggable';
import OfficeLayout from '@/Layout/Office.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import Header from '@/UI/Header.vue';

const columns = ref([
  {
    title: 'Новые',
    color: 'gray',
    orders: [
      {
        id: 1,
        title: 'Заказ наряд #00001',
        date: '14.09.2021',
        type: 'Тип заказ-наряда',
        color: 'red',
        user: {
          name: 'Иванов Иван',
          role: 'Турбинный цех',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        count_tasks: 2,
      },
      {
        id: 1,
        title: 'Заказ наряд #00002',
        date: '14.09.2021',
        type: 'Тип заказ-наряда',
        color: 'blue',
        user: {
          name: 'Иванов Иван',
          role: 'Турбинный цех',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        count_tasks: 8,
      },
      {
        id: 1,
        title: 'Заказ наряд #00003',
        date: '14.09.2021',
        type: 'Тип заказ-наряда',
        color: 'purple',
        user: {
          name: 'Иванов Иван',
          role: 'Турбинный цех',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        count_tasks: 5,
      },
    ],
  },
  {
    title: 'Слесарный цех',
    color: 'gray',
    orders: [],
  },
  {
    title: 'Турбинный цех',
    color: 'gray',
    orders: [],
  },
  {
    title: 'Проверка',
    color: 'gray',
    orders: [],
  },
  {
    title: 'Завешено',
    color: 'green',
    orders: [],
  },
]);

</script>

<template>
  <OfficeLayout title="Заказ-наряды">
    <template #actions>
      <Button type="secondary" link="/pipelines">
        <ViewBoardsIcon class="w-5 h-5 mr-1"/>Воронка
      </Button>

      <Button color="blue" link="/orders/create">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>Создать
      </Button>
    </template>

    <Header>Фильтр</Header>

    <!-- Filter -->
    <div class="flex flex-wrap gap-2 items-end">
      <Input label="Название"/>

      <Input label="Дата от" type="date" />
      <Input label="Дата до" type="date" />

      <div>
        <Select
          label="Исполнитель"
          :options="[{label: 'Не выбрано', value: null}]"
          class="w-44"
        />
      </div>

      <div>
        <Select
          label="Тип"
          :options="[{label: 'Не выбрано', value: null}]"
          class="w-44"
        />
      </div>
    </div>

    <div class="flex justify-left mt-5">
      <div class="flex overflow-x-auto">
        <div
          v-for="column in columns"
          :key="column.title"
          :class="[`bg-${column.color}-100`, 'tasks']"
        >
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ column.title }}</p>

          <Draggable
            item-key="id"
            :list="column.orders"
            group="orders"
            ghost-class="ghost"
            class="tasks-container"
            @end="log"
          >
            <template #item="{element}">
              <div class="task"
                   :key="element.id"
              >
                <div class="flex justify-between">
                  <div>
                    <Link class="font-semibold font-sans tracking-wide text-sm">
                      {{ element.title }}
                    </Link>

                    <div class="text-xs">
                      <Link>
                        Задач: {{ element.count_tasks }}
                      </Link>
                    </div>
                  </div>

                  <div v-if="element.user" class="flex flex-col items-end">
                    <Link>
                      <img
                        class="w-8 h-8 rounded-full ml-3"
                        :src="element.user.image"
                        alt=""
                        :title="element.user.name"
                      >
                    </Link>
                  </div>
                </div>
                <div class="flex mt-4 justify-between items-center">
                  <span class="text-sm text-gray-600">{{ element.date }}</span>
                  <Badge :color="element.color" :point="true" v-if="element.type">{{ element.type }}</Badge>
                </div>
              </div>
            </template>
          </Draggable>
        </div>
      </div>
    </div>
  </OfficeLayout>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
}

.task {
  @apply bg-white shadow rounded px-3 pt-3 my-2 pb-5 border border-white;
  min-width: 260px;
}

.tasks {
  @apply rounded-lg p-3 rounded mr-4;
  min-width: 290px;
}

.tasks-container {
  height: calc(100% - 30px);
}
</style>
