<script setup>
import { ref } from 'vue';
import { ClockIcon, PaperClipIcon } from '@heroicons/vue/outline';
import Comments from '@/Partials/Comments.vue';
import { DescriptionList, DescriptionListItems, DescriptionListItem } from '@/UI/DescriptionList/index.js';
import service from '~/services/tasks/worker-preview';
import Checkbox from '@/UI/Checkbox.vue';
import { generateShapedIdfromId, tasksColorMap } from '~/helpers';
import Preview from '@/Partials/processes/DiagnosticCardPreview.vue';
import $ from '~/helpers/fetch';
import Badge from '@/UI/Badge.vue';

const { task, atMounted, route, checkBox, canTasks, allowed } = service();

const dc_template = ref({});

await atMounted().then(async () => {
  if(task.value.is_map) {
    dc_template.value = await $.map(task.value.task_map.map_id)
  }
})

</script>

<template>
  <div>
    <!-- Description list-->
    <section>
      <DescriptionList :title="task?.name" :subtitle="task?.order?.id ? `Заказ-наряд #${generateShapedIdfromId(task?.order?.id)}` : ''" type="columns">

        <template #right-title>
          <div class="text-right">
              <div class="text-sm flex items-center mb-3">
                  <ClockIcon class="w-4 h-4 mr-1"/>
                  <span class="mr-1">Крайний срок:</span>
                  <span class="text-gray-500">{{ task.deadline_at ?? '' }}</span>
              </div>

              <Badge :point="true" :color="tasksColorMap[task.status].color">{{ tasksColorMap[task.status].label }}</Badge>
          </div>
        </template>

        <DescriptionListItems type="columns" :cols="3">

          <DescriptionListItem cols="1" label="Автомобиль" :value="`${task?.order?.car?.car_model?.car_mark?.name ?? ''} ${task?.order?.car?.car_model?.name ?? '_'}`" type="columns" />

          <DescriptionListItem cols="1" label="ГОС номер" :value="task?.order?.car?.number ?? ''" type="columns" />

          <DescriptionListItem
            cols="1"
            label="Клиент"
            :value="`${task?.order?.client?.name ?? ''} ${task?.order?.client?.middle_name ?? ''}`"
            type="columns"
          />
          <!-- not yet -->

          <DescriptionListItem cols="3" label="Задача" type="columns" columns="2" v-if="!task.is_map">
            <p v-html="task.description" />
          </DescriptionListItem>

          <DescriptionListItem cols="3" label="" type="columns" columns="2" v-else>
            <preview
              :for_worker="true"
              :task_id="task.id"
              :map_answer="task.map_answer"
              :fields="dc_template.data ?? []"
              :dc_template="dc_template"
              :no-head="true"
              :disabled="!allowed"
            />
          </DescriptionListItem>

          <DescriptionListItem cols="3" label="Чек лист" type="columns" columns="2" v-if="task?.checkboxes?.length && !task.is_map">
            <ul>
                <li
                    v-for="(item, i) in task.checkboxes"
                    :key="item.id"
                    :class="['py-2', {'line-through': item.is_checked}]"
                >
                  <Checkbox
                    :disabled="!allowed"
                    :label="item.description"
                    v-model="item.is_checked"
                    @clicked="() => checkBox(item.id, !item.is_checked, i)"
                  />
                </li>
            </ul>
            <span class="mt-4 text-sm text-gray-400">
                Выполнено: {{ task?.checkboxes?.filter(e => e.is_checked).length }} из {{ task?.checkboxes?.length }}
            </span>
          </DescriptionListItem>

          <DescriptionListItem cols="3" label="Вложения" type="columns" columns="2" v-if="task.files?.length && !task.is_map">
            <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
              <li v-for="file in task.files" :key="`${file.id}-file`" class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div class="w-0 flex-1 flex items-center">
                  <PaperClipIcon class="w-4 h-4"/>
                  <span class="ml-2 flex-1 w-0 truncate">{{ file.name }}</span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a :disabled="!allowed" :href="file.url" target="_blank" class="font-medium text-blue-600 hover:text-blue-500" >Скачать</a>
                </div>
              </li>
            </ul>
          </DescriptionListItem>

        </DescriptionListItems>
      </DescriptionList>
    </section>

    <Comments model="task" :id="route.params.id" class="mt-2" />
  </div>
</template>
