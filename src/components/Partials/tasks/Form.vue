<script setup>
import { computed, watch } from 'vue';
import Button from '@/UI/Button.vue';
import Wysiwyg from '@/UI/Wysiwyg.vue';
import Upload from '@/UI/Upload.vue';
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import service from '~/services/tasks/form';
import { maybeRun } from '~/helpers';
import userStore from '~/store/employees';
import departmentStore from '~/store/departments';

const { current } = departmentStore;

const { load, options } = userStore;

const { fields, atMounted, log } = service();

const removeItem = maybeRun((i) => fields.checkboxes.splice(i, 1), computed(() => fields.checkboxes.length > 1));

const statusOptions = [
  { value: 'wait', label: 'Ожидание' },
  { value: 'process', label: 'Обработка' },
  { value: 'pause', label: 'Приостановлено' },
  { value: 'done', label: 'Сделанный' },
];

watch(current, async () => {
  await load({ department_id: current.value });
}, { immediate: true });

await atMounted();

</script>

<template>
    <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 sm:col-span-3">
            <Input label="Название задачи" v-model="fields.name" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Крайний срок" type="date" v-model="fields.deadline_at" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Исполнитель" :options="options" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Заказ наряд" :options="[{label: 'Не выбрано', value: 0}]" v-model="fields.order_id" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Input label="Должность" type="number" :step="1" v-model="fields.position" />
        </div>

        <div class="col-span-12 sm:col-span-3">
            <Select label="Статус" :options="statusOptions" v-model="fields.status" />
        </div>

        <div class="col-span-12 sm:col-span-12">
            <Wysiwyg label="Текст задачи" v-model="fields.description" />
        </div>

        <div class="col-span-12 sm:col-span-12">
            <label class="block text-sm font-medium text-gray-700 mb-2">Чек лист</label>
            <ul>
                <li v-for="(c, i) in fields.checkboxes" :key="'input-'+i" class="flex items-start mb-2">
                    <span class="w-5 pt-2">{{ i + 1 }}</span>
                    <Input rows="1" class="flex-grow mx-2" placeholder="Текст задачи" v-model="fields.checkboxes[i]" />
                    <Button color="red" size="sm" @click="removeItem(i)">Удалить</Button>
                </li>
            </ul>
            <Button size="xs" class="mt-4" @click="fields.checkboxes.push('')">Добавить</Button>
        </div>

        <div class="col-span-12 sm:col-span-12"><Upload :multiple="true" @selected="log" /></div>
    </div>
</template>
