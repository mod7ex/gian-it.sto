<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid';
import Draggable from 'vuedraggable';
import { shallowRef } from 'vue';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import service from '~/services/orders';
import { defaults } from '~/composables/useAvatar';
import { generateShapedIdfromId } from '~/helpers';

const { columns, log, atMounted } = service();

await atMounted();

// const kanbanRef = shallowRef();

// const scrollTo = (right = false) => {
//   setInterval(() => {
//     kanbanRef.value.scroll({
//       left: right ? 100 : 0,
//       // left: right ? kanbanRef.value.scrollWidth : 0,
//       behavior: 'smooth',
//     });
//   }, 1000)
// };

</script>

<template>
  <div class="relative">

    <div id="kanban" ref="kanbanRef" class="flex items-stretch overflow-x-scroll pb-3 my-16 relative">
        <div
          v-for="[id, {name, color}] in Object.entries(columns)"
          :key="id"
          class="rounded-lg p-3 col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 mr-5 stage"
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
<!--
        <div class="overlay absolute my-auto z-50 right-0 left-0 bottom-0 top-0 flex justify-between items-center bg-green-300 opacity-30">
          <span @mouseenter="() => scrollTo()" class="chevron chevron-left bg-gray-600 opacity-60 py-5 rounded-r-full top-1/4 left-0 flex items-center" >
            <ChevronLeftIcon  class="text-white w-16" />
          </span>

          <span @mouseenter="() => scrollTo(true)" class="chevron chevron-right bg-gray-600 opacity-60 py-5 rounded-l-full top-1/4 right-0 flex items-center" >
            <ChevronRightIcon  class="text-white w-16" />
          </span>
        </div>
-->
    </div>

  </div>

</template>

<style scoped>
/*
#kanban .overlay{
  pointer-events: none;
}

#kanban .overlay span{
  pointer-events: all;
}

.chevron {
  min-height: 200px;
}

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
</style>
