<script setup>
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Table from '@/Layout/Table.vue';
import store from '~/store/processes/tasks';
import useAppRouter from '~/composables/useAppRouter';
import useConfirmDialog from '~/composables/useConfirmDialog';

const { route, redirectTo } = useAppRouter();

const { id } = route.params;

const { state, fill, reset, drop: dropTask } = store;

const fields = [
  { label: 'Название', key: 'name' },
  { label: 'Этап заказ наряда', key: 'order_stage' },
  { label: 'Тип', key: 'type' },
  { label: 'Ответственная роль', key: 'role' },
  { label: 'Порядок', key: 'position' },
  { label: 'Дата создания', key: 'created_at' },
];

const fetchTasks = async (bool = false) => {
  if (bool) reset();
  await fill({process_category_id: id});
};

await fetchTasks(true);

const { drop } = useConfirmDialog();

</script>

<template>
    <Table
        @bottom-touched="() => fetchTasks()"
        :fields="fields"
        :items="state.raw"
        @delete="(id) => drop(() => dropTask(id))"
        @edit="(task) => redirectTo({ name: 'ProcessTaskEdit', params: { task, id } })"
    >
        <!-- Body -->
        <template #td-name="{ value, item: {id: task, is_map} }" >
          <Link v-if="is_map" :href="{ name: 'DcEdit', params: { dk: task, id } }"> {{ value }} </Link>
          <Link v-else :href="{ name: 'ProcessTaskEdit', params: { task, id } }"> {{ value }} </Link>
        </template>

        <template #td-role="{ value, item }" >
          <Badge :point="true" color="blue">
            {{ value.title }}
          </Badge>
        </template>

        <template #td-order_stage="{ value }" >
            {{ value.name }}
        </template>

        <template #td-type="{ item }" >
          <Badge :point="true" :color="item?.is_map ? 'green' : 'purple'">
            {{ item?.is_map ? 'Диагностическая карта' : 'Задачa' }}
          </Badge>
        </template>

        <template #td-position="{ value }" >
          {{ value }}
        </template>

        <template #td-created_at="{ value }" >
          {{ value?.split(' ')[0] ?? '_' }}
        </template>
        <!-- ****** -->
    </Table>
</template>
