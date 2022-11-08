<script setup>
import Draggable from "vuedraggable";
import Badge from "@/UI/Badge.vue";
import Link from "@/UI/Link.vue";
import service from "~/services/tasks/kanban";
import { defaults } from "~/composables/useAvatar";
import { tasksColorMap, generateShapedIdfromId } from "~/helpers";
import { canTasks, userHasAtLeastOnePermission } from "~/lib/permissions";

const { log, atMounted, state, columns } = service();

await atMounted();

const canDragAndDrop = userHasAtLeastOnePermission([
  "update stage tasks",
  "update department stage tasks",
  "update own stage tasks",
]);

// const canDrag = (task) => { return canTasks(task, 'update_stage') && task.status !== 'process'; }
const canDrag = (task) => {
  return canTasks(task, "update_stage");
};
</script>

<template>
  <div class="mb-8 relative">
    <!-- <div @scroll="() => foo()" id="tasks-kanban" :ref="el => kanbanRef = el" class="flex gap-5 items-stretch overflow-x-scroll pb-5 shadow-inner p-5"> -->
    <div class="grid grid-cols-12 gap-3 pb-5">
      <div
        v-for="[id, { name, color }] in Object.entries(columns)"
        :key="id"
        class="rounded-lg p-3 col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 stage overflow-y-scroll no-scrol-scroll-thum"
        :style="{ background: color }"
      >
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
          {{ name }}
        </p>
        <Draggable
          item-key="id"
          v-model="columns[id].tasks"
          group="tasks"
          ghost-class="ghost"
          class="tasks-container"
          :id="id"
          @end="log"
          :disabled="/* !userHasPermission('update tasks') */ !canDragAndDrop"
          draggable=".draggable"
        >
          <template #item="{ element }">
            <div
              :class="[
                ' shadow rounded px-3 pt-3 my-2 pb-5 border w-full select-none cursor-pointer',
                canDrag(element)
                  ? 'draggable bg-white'
                  : 'bg-gray-100 opacity-60',
              ]"
              :key="element.id"
              :id="element.id"
            >
              <div class="flex justify-between">
                <div>
                  <Link
                    :disabled="!canDrag(element)"
                    class="font-semibold font-sans tracking-wide text-sm"
                    :href="{
                      name: 'WorkerTask',
                      params: { id: element.id },
                      query: { from: 'kanban' },
                    }"
                  >
                    {{ element.name }}
                  </Link>
                </div>

                <div class="flex flex-col items-end">
                  <Link>
                    <img
                      class="w-8 h-8 rounded-full ml-3"
                      :src="element.user?.avatar ?? defaults.avatar"
                      :title="`${element.user?.name} ${element.user?.middle_name}`"
                    />
                  </Link>
                </div>
              </div>

              <div class="mb-2" v-if="element.order?.id">
                <span class="text-sm text-gray-600"
                  >Заказ-наряд #{{
                    generateShapedIdfromId(element.order?.id)
                  }}</span
                >
              </div>

              <div v-if="element?.order?.car?.car_model">
                <Badge color="blue" :point="true">
                  {{
                    `${element?.order?.car?.car_model?.car_mark?.name ?? ""} ${
                      element?.order?.car?.car_model?.name ?? "_"
                    }`
                  }}
                </Badge>
              </div>

              <div class="flex mt-2 justify-between items-center">
                <span class="text-sm text-gray-600">{{
                  element.created_at.split(" ")[0]
                }}</span>
                <Badge
                  :point="true"
                  :color="tasksColorMap[element.status].color"
                  >{{ tasksColorMap[element.status].label }}</Badge
                >
              </div>
            </div>
          </template>
        </Draggable>
      </div>
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

.stage {
  min-width: 300px;
  max-height: 590px;
}

@media (min-width: 2000px) {
  .stage {
    grid-column: span 2 / span 2;
  }
}

.ghost {
  opacity: 0.1;
}

.tasks-container {
  height: calc(100% - 30px);
}
</style>
