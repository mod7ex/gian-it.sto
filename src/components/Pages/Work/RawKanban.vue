<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import Draggable from 'vuedraggable';
import { shallowRef, watch } from 'vue';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import service from '~/services/tasks/kanban';
import { defaults } from '~/composables/useAvatar';
import { tasksColorMap } from '~/helpers';
import {userHasPermission} from '~/lib/permissions'

const { log, atMounted, state, getKanBanPayload, theSelectedFunnel, fillColumns, columns } = service();

watch(theSelectedFunnel, fillColumns);

await atMounted();

const canDragAndDrop = (userHasPermission('read own tasks') && userHasPermission('update status tasks'))
  || (userHasPermission('update tasks') && !userHasPermission('read own tasks'))

/*

const kanbanRef = shallowRef();

const show = shallowRef(0);

let timer;

const clearTimer = () => {
  if (timer != null) {
    clearInterval(timer);
    timer = undefined;
  }
};

const scrollTo = (right = false) => {
  clearTimer();
  timer = setInterval(() => {
    const target = kanbanRef.value ?? document.getElementById('tasks-kanban');
    const step = 70;
    const left = right ? target.scrollLeft + step : target.scrollLeft - step;

    requestAnimationFrame(() => {
      target.scroll({
        left,
        behavior: 'smooth',
      });
    });
  }, 60);
};

const foo = () => {
  const target = kanbanRef.value ?? document.getElementById('tasks-kanban');
  if (target.scrollLeft === 0) {
    clearTimer();
    show.value = 0;
    return;
  }

  if (target.scrollLeft + target.clientWidth >= target.scrollWidth - 1) {
    clearTimer();
    show.value = 1;
    return;
  }

  show.value = 2;
};

*/

</script>

<template>
  <div class="my-8 relative" v-if="theSelectedFunnel" >

    <!-- <div @scroll="() => foo()" id="tasks-kanban" :ref="el => kanbanRef = el" class="flex gap-5 items-stretch overflow-x-scroll pb-5 shadow-inner p-5"> -->
    <div class="grid grid-cols-12 gap-3 pb-5">
      <div
        v-for="[id, {name, color}] in Object.entries(columns)"
        :key="id"
        class="rounded-lg p-3 col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 stage"
        :style="{background: color}"
      >
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ name }}</p>
        <Draggable
          item-key="id"
          v-model="columns[id].tasks"
          group="tasks"
          ghost-class="ghost"
          class="tasks-container"
          :id="id"
          @end="log"
          :disabled="/* !userHasPermission('update tasks') */ !canDragAndDrop"
        >
          <template #item="{element}">
            <div class="bg-white shadow rounded px-3 pt-3 my-2 pb-5 border w-full select-none" :key="element.id" :id="element.id" >
              <div class="flex justify-between">
                <div>
                  <Link class="font-semibold font-sans tracking-wide text-sm" :href="{ name: 'WorkerTask', params: {id: element.id} }" >
                    {{ element.name}}
                  </Link>
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
                <Badge :point="true" :color="tasksColorMap[element.status].color">{{ tasksColorMap[element.status].label }}</Badge>
              </div>
            </div>
          </template>
        </Draggable>
      </div>
    </div>
<!--
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
-->
  </div>
</template>

<style scoped>

.overlay {
  pointer-events: none;
}

.overlay span {
  pointer-events: all;
}

.chevron {
  min-height: 200px;
}

/*
.chevron-left {}
*/

.stage {
  min-width: 300px;
  min-height: 400px;
}

@media (min-width: 2000px) {
  .stage{
    grid-column: span 2 / span 2;
  }
}

.ghost {
  opacity: 0.1;
}

.tasks-container {
  height: calc(100% - 30px);
}

/* **************************************** */
/*
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
*/
</style>
