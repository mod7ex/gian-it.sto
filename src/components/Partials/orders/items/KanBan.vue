<script setup>
import Draggable from 'vuedraggable';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import service from '~/services/orders';
import { defaults } from '~/composables/useAvatar';
import { generateShapedIdfromId } from '~/helpers';

const { columns, log, atMounted } = service();

await atMounted();

</script>

<template>
      <div class="flex items-stretch overflow-x-scroll pb-3 my-16">
      <!-- <div class="grid grid-cols-12 grid-rows-6 sm:grid-rows-4 xl:grid-rows-3 gap-2"> -->
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
                      Заказ-наряды #{{ generateShapedIdfromId(element.id) }}
                    </Link>

                    <div class="text-xs">
                      <Link>Задач: {{ /* 'element.count_tasks' */ 0 }}</Link>
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
                  <!-- <Badge color="blue" :point="true" v-if="element.type">{{ 'element.type' }}</Badge> -->
                  <Badge color="blue" :point="true" >{{ 'element.type' }}</Badge>
                </div>

              </div>
            </template>
          </Draggable>

        </div>
      </div>
</template>

<style scoped>
.stage{
  min-width: 300px;
  min-height: 600px;
}

.ghost {
  opacity: 0.5;
}

.tasks-container {
  height: calc(100% - 30px);
}
</style>
