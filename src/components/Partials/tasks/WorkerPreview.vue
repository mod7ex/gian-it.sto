<script setup>
import { PaperClipIcon } from '@heroicons/vue/outline';
import Comments from '@/Partials/Comments.vue';
import { DescriptionList, DescriptionListItems, DescriptionListItem } from '@/UI/DescriptionList/index.js';
import service from '~/services/tasks/worker-preview';
import Checkbox from '@/UI/Checkbox.vue';
import { generateShapedIdfromId } from '~/helpers'

const { task, atMounted, route, checkBox, canTasks } = service();

await atMounted();

</script>

<template>
  <div>
    <!-- Description list-->
    <section>
      <DescriptionList :title="task?.name" :subtitle="`Заказ-наряд #${generateShapedIdfromId(task?.order?.id)}`" type="columns">
        <DescriptionListItems type="columns" :cols="3">

          <DescriptionListItem cols="1" label="Автомобиль" :value="task?.order?.car?.car_model?.name ?? ''" type="columns" />

          <DescriptionListItem cols="1" label="ГОС номер" :value="task?.order?.car?.number ?? ''" type="columns" />

          <DescriptionListItem cols="1" label="Клиент" :value="`${task?.order?.client?.name} ${task?.order?.client?.surname} ${task?.order?.client?.middle_name ?? ''}`" type="columns" />
        
          <!-- not yet -->
        
          <DescriptionListItem cols="3" label="Задача" type="columns" columns="2">
            <p v-html="task.description" />
          </DescriptionListItem>

          <DescriptionListItem cols="3" label="Чек лист" type="columns" columns="2" v-if="task?.checkboxes?.length">
            <ul>
                <li
                    v-for="(item, i) in task.checkboxes"
                    :key="item.id"
                    :class="['py-2', {'line-through': item.is_checked}]"
                >
                    <Checkbox
                        :disabled="!canTasks(task, 'update')"
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

          <DescriptionListItem cols="3" label="Вложения" type="columns" columns="2" v-if="task.files?.length">
            <ul role="list" class="border border-gray-200 rounded-md divide-y divide-gray-200">
              <li v-for="file in task.files" :key="`${file.id}-file`" class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div class="w-0 flex-1 flex items-center">
                  <PaperClipIcon class="w-4 h-4"/>
                  <span class="ml-2 flex-1 w-0 truncate">{{ file.name }}</span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a :href="file.url" target="_blank" class="font-medium text-blue-600 hover:text-blue-500" >Скачать</a>
                </div>
              </li>
            </ul>
          </DescriptionListItem>

        </DescriptionListItems>
      </DescriptionList>
    </section>

    <Comments model="task" :id="route.params.id" class="mt-2" :disabled="!canTasks(task, 'update')" />
  </div>
</template>
