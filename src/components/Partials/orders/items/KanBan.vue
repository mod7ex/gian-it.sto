<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import Draggable from 'vuedraggable';
import { computed, shallowRef } from 'vue';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import service from '~/services/orders';
import { defaults } from '~/composables/useAvatar';
import { generateShapedIdfromId } from '~/helpers';

const { columns, log, atMounted } = service();

await atMounted();

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

</script>

<template>
  <div class="my-16 relative">

    <div @scroll="() => foo()" id="orders-kanban" :ref="el => kanbanRef = el" class="flex gap-5 items-stretch overflow-x-scroll pb-5">
      <div
        v-for="[id, {name, color}] in Object.entries(columns)"
        :key="id"
        class="rounded-lg p-3 col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 stage"
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
          @end="log"
        >
          <template #item="{element}">
            <div class="bg-white shadow rounded px-3 pt-3 my-2 pb-5 border w-full" :key="element.id" :id="element.id" >
              <div class="flex justify-between">

                <div>
                  <Link class="font-semibold font-sans tracking-wide text-sm" :href="{ name: 'OrderEdit', params: {id: element.id} }" >
                    Заказ-наряд #{{ generateShapedIdfromId(element.id) }}
                  </Link>

                  <div class="text-xs">
                    <Link>Задач: {{ element.count_tasks }}</Link>
                  </div>
                </div>

                <div class="flex flex-col items-end">
                  <Link>
                    <img
                      class="w-8 h-8 rounded-full ml-3"
                      :src="element.user?.avatar ?? defaults.avatar"
                      :title="`${element.user?.name} ${element.user?.surname}`"
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
.chevron-left {

}
*/

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
</style>
