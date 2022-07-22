<script setup>
import { ref, computed, onMounted } from 'vue';
import Draggable from 'vuedraggable';
import Badge from '@/UI/Badge.vue';
import Link from '@/UI/Link.vue';
import service from '~/services/orders';
import store from '~/store/orders';
import stageStore from '~/store/pipelines/stages';
import departmentStore from '~/store/departments';
import {defaults} from '~/composables/useAvatar'

const { load, state } = store;
const { current } = departmentStore;
const { state: stageState, load_orders_stages } = stageStore;


const columns = computed(() => {
  const kanban = state.raw.reduce((payload, curr) => {
    const { id, color, name } = curr.stage;

    if (id in payload) payload[id].orders.push(curr);
    else {
      payload[id] = {
        orders: [curr],
        name,
        color,
      };
    }

    return payload;
  }, {});

  stageState.raw.forEach(({ id, color, name }) => {
    if (id in kanban) return;
    kanban[id] = {
      orders: [],
      name,
      color,
    };
  });

  return kanban;
});

await Promise.all([load({ department_id: current.value }), load_orders_stages()]);

const log = () => {};

</script>

<template>
    <div class="flex justify-left">
      <div class="flex flex-wrap items-stretch">
        <div
          v-for="[id, {orders, name, color}] in Object.entries(columns)"
          :key="id"
          class="rounded-lg p-3 mr-4 mb-4 tasks"
          :style="{background: color}"
        >
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ name }}</p>

          <Draggable
            item-key="id"
            :list="orders"
            group="orders"
            ghost-class="ghost"
            class="tasks-container"
            @end="log"
          >
            <template #item="{element}">
              <div class="task bg-white shadow rounded px-3 pt-3 my-2 pb-5 border" :key="element.id" >
                <div class="flex justify-between">

                  <div>
                    <Link class="font-semibold font-sans tracking-wide text-sm" :href="{ name: 'OrderEdit', params: {id: element.id} }" >
                      Заказ-наряды #{{ element.id }}
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
    </div>
</template>

<style scoped>
.ghost {
  opacity: 0.5;
}

.task {
  min-width: 260px;
}

.tasks { 
  min-width: 290px;
}

.tasks-container {
  height: calc(100% - 30px);
}
</style>
