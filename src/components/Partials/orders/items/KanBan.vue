<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import Draggable from 'vuedraggable';
import { computed, reactive, shallowRef } from 'vue';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import service from '~/services/orders';
import { defaults } from '~/composables/useAvatar';
import { generateShapedIdfromId, hyphenatedDateFormat } from '~/helpers';
import FormActions from '@/Layout/modal/FormActions.vue';
import Table from '@/Layout/Table.vue';
import { canTasks } from '~/lib/permissions';
import { userHasAtLeastOnePermission } from '~/lib/permissions'
import Select from '@/UI/Select.vue';
import userStore from '~/store/employees'
import departmentStore from '~/store/departments'
import { updateTaskUserId } from '~/services/tasks/form';
import { userHasPermission } from '~/lib/permissions'

const { load, options } = userStore
const { current } = departmentStore

const { columns, log, atMounted, tasksState , showModal ,loadTasks, getTaskById, toaster, state } = service();

await atMounted();

const tasksShip = reactive({})

const onSuccessMove = async (d, order_id) => {
  await Promise.all([load({department_id: current.value}), loadTasks({ order_id, created_after: hyphenatedDateFormat(d) })]).then(() => {
    showModal.value = true;
  });
}

const modelTasks = computed(() => tasksState.raw.filter(({user}) => !user))

// ****************************************************** Newly created tasks on Order-move in kanban
const loading = shallowRef(false);
const updateMsg = shallowRef();

const updateTask = async (task_id, user_id) => {
  if(!user_id) return
  const _task = getTaskById(task_id)
  if(!_task) return
  const { message, success } = await updateTaskUserId(_task, user_id);
  if(!success && !updateMsg.value) updateMsg.value = `${message ?? 'Что-то пошло не так'} (с этой задачей ${_task.name})`;
  return { message, success }
};

const saveOptions = async () => {
  updateMsg.value = undefined;

  loading.value = true;

  try {
    await Promise.all(Object.entries(tasksShip).map(([task_id, user_id]) => updateTask(task_id, user_id))).then((res) => {
      if(res.every(({success}) => success)) {
        showModal.value = false
        toaster.success('Задачи успешно сохранены')
      }
    })
  } finally {
    loading.value = false;
  }
}
// ******************************************************

const kanbanRef = shallowRef();
const show = shallowRef(0)

let timer;

const clearTimer = () => {
  if(timer != null) {
    clearInterval(timer)
    timer = undefined
  }
}


const scrollTo = (right = false) => {
  clearTimer()
  timer = setInterval(() => {
    let target = kanbanRef.value ?? document.getElementById('orders-kanban')
    let step = 70
    let left = right ? target.scrollLeft + step : target.scrollLeft - step

    requestAnimationFrame(() => {
      target.scroll({
        left,
        behavior: 'smooth'
      })
    })
  }, 60)
};

const foo = () => {
  let target = kanbanRef.value ?? document.getElementById('orders-kanban')
  if(target.scrollLeft === 0) {
    clearTimer()
    show.value = 0
    return
  }

  if(target.scrollLeft + target.clientWidth >= target.scrollWidth - 1) {
    clearTimer()
    show.value = 1
    return
  }

  show.value = 2
}

const fields = [
  { label: 'Тип', key: 'type' },
  { label: 'Название', key: 'name' },
  { label: 'Исполнитель', key: 'user' },
];

</script>

<template>
<div>
  <div class="my-16 relative">
    <div @scroll="() => foo()" id="orders-kanban" :ref="el => kanbanRef = el" class="flex gap-5 items-stretch overflow-x-scroll pb-5">
      <div
        v-for="[id, {name, color}] in Object.entries(columns)"
        :key="id"
        class="rounded-lg p-3 stage"
        :style="{background: color}"
      >
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ name }}</p>

        <Draggable
          item-key="id"
          v-model="columns[id].orders"
          group="orders"
          ghost-class="ghost"
          class="tasks-container"
          :id="id"
          @end="e => log(e, onSuccessMove)"
          :disabled="!userHasPermission('crud orders')"
        >
          <template #item="{element}">
            <div class="bg-white shadow rounded px-3 pt-3 my-2 pb-5 border w-full" :key="element.id" :id="element.id" >
              <div class="flex justify-between">

                <div>
                  <Link :disabled="!userHasPermission('crud orders')" class="font-semibold font-sans tracking-wide text-sm" :href="{ name: 'OrderEdit', params: {id: element.id} }" >
                    Заказ-наряд #{{ generateShapedIdfromId(element.id) }}
                  </Link>

                  <div class="text-xs">
                    <Link :disabled="true" >Задач: {{ element.count_tasks }}</Link>
                  </div>
                </div>

                <div class="flex flex-col items-end">
                  <Link>
                    <img
                      class="w-8 h-8 rounded-full ml-3"
                      :src="element.user?.avatar ?? defaults.avatar"
                      :title="`${element.user?.name} ${element.user?.middle_name}`"
                    >
                  </Link>
                </div>

              </div>

              <div class="flex mt-4 justify-between items-center">
                <span class="text-sm text-gray-600">{{ element.created_at.split(' ')[0] }}</span>
                <Badge color="blue" :point="true" v-if="element?.car?.car_model?.car_mark?.name || element?.car?.car_model?.name" >
                  {{ `${element?.car?.car_model?.car_mark?.name ?? ''} ${element?.car?.car_model?.name ?? '_'}`.substr(0, 20) }}
                </Badge>
              </div>
            </div>
          </template>
        </Draggable>
      </div>
    </div>
 
    <div class="overflow-hidden overlay absolute my-auto z-50 right-0 left-0 bottom-0 top-0 flex items-center opacity-30">
      <Transition tag="div" name="slide-fade-left">
        <span v-if="show !== 0" @mouseenter.prevent="() => scrollTo()" @mouseleave="clearTimer" class="chevron chevron-left bg-gray-900 opacity-75 py-5 rounded-r-full top-1/4 left-0 flex items-center" >
          <ChevronLeftIcon class="text-white w-16" />
        </span>
      </Transition>

      <Transition tag="div" name="slide-fade-right">
        <span v-if="show !== 1" @mouseenter="() => scrollTo(true)" @mouseleave="clearTimer" class="ml-auto chevron chevron-right bg-gray-900 opacity-75 py-5 rounded-l-full top-1/4 right-0 flex items-center" >
          <ChevronRightIcon class="text-white w-16" />
        </span>
      </Transition>
    </div>
 
  </div>

  <Teleport to="#sto-modal-teleport" v-if="modelTasks.length && showModal">
    <Transition name="docs-modal">
      <div class="absolute p-9 bg-gray-600 inset-0 flex justify-center items-center bg-opacity-75 z-50" >
        <div class="bg-white rounded-md px-3 py-6 mt-12 shadow-2xl w-full max-w-3xl m-6">

          <div class="p-1 overflow-y-scroll max-h-vw">
            <h1 class="text-lg mb-m text-center">Автоматически созданные задачи</h1>

            <p class="text-xs text-gray-600 text-center">Укажите ответственного для задачи</p>

            <p :class="['text-xs text-center my-3 select-none', updateMsg ? 'text-red-500' : 'text-transparent']" >{{ updateMsg ? updateMsg : 'a' }}</p>

            <Table
              @bottom-touched="() => {}"
              :fields="fields"
              :items="modelTasks"
              :actions="false"
            >
              <template #td-name="{ value, item: {id} }" >
                <Link :href="{name: 'Task', params: { id }}" >{{ value }}</Link>
              </template>

              <template #td-type="{ item: {is_map} }" >
                <Badge :point="true" :color="is_map ? 'green' : 'purple'">
                  {{ is_map ? 'Диагностическая карта' : 'Задачa' }}
                </Badge>
              </template>

              <template #td-user="{item}" >
                <Select
                  v-model="tasksShip[item.id]"
                  :options="options"
                  class="w-full z-50"
                />
              </template>
            </Table>

          </div>
          
          <form-actions :loading="loading" @close="() => { showModal = false }" @submited="() => saveOptions()" />

        </div>
      </div>
    </Transition>
  </Teleport>

</div>
</template>

<style scoped>

#orders-kanban::-webkit-scrollbar {
  width: 1em;
  height: 1em;
}

#orders-kanban::-webkit-scrollbar-track {
  box-shadow: none;
}

#orders-kanban::-webkit-scrollbar-track:hover {
  box-shadow: inset 0 0 7px 3px rgba(0, 0, 0, 0.1);
}

#orders-kanban::-webkit-scrollbar-thumb {
  background-color: darkgray;
}

#orders-kanban::-webkit-scrollbar-thumb:hover {
  background-color: #2563EB;
}

/* ***************************************************** */

.max-h-vw {
  max-height: 80vh;
}

.overlay {
  pointer-events: none;
}

.overlay span {
  pointer-events: all;
}

.chevron {
  min-height: 200px;
}

.stage{
  min-width: 300px;
  min-height: 400px;
}

.ghost {
  opacity: 0.1;
}

.tasks-container {
  height: calc(100% - 30px);
}

/* **************************************** */
.slide-fade-left-enter-active {
  transition: all .3s ease-in;
}

.slide-fade-left-leave-active {
  transition: all .3s ease-in;
}

.slide-fade-left-leave-to {
  transform: translateX(-100px);
}

.slide-fade-left-enter-from{
  transform: translateX(-100px);
}

/* Right */

.slide-fade-right-enter-active {
  transition: all .3s ease-in;
}

.slide-fade-right-leave-active {
  transition: all .3s ease-in;
}

.slide-fade-right-leave-to {
  transform: translateX(100px);
}

.slide-fade-right-enter-from{
  transform: translateX(100px);
}

/* ***************************** */

.docs-modal-enter-active,
.docs-modal-leave-active {
  transition: opacity 0.3s ease;
}

.docs-modal-enter-from,
.docs-modal-leave-to {
  opacity: 0;
}
</style>
