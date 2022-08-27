<script setup>
import Link from '@/UI/Link.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import carsService from '~/services/cars/cars';
import Table from '@/Layout/Table.vue';

const { dropCar, moveToEditCarPage } = carsService();

const { drop } = useConfirmDialog();

const props = defineProps({
  cars: {
    type: Array,
    default: [],
  },

  showOwner: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['carDropped']);

const dropCarWrapper = async (id) => {
  const { success, message } = await dropCar(id);
  try {
    return { success, message };
  } finally {
    if (success) emit('carDropped', id);
  }
};

const fields = [
  { label: 'Автомобиль', key: 'car_model' },
  { label: 'Вин номер', key: 'vin' },
  { label: 'Гос. номер', key: 'number' },
];

if (props.showOwner) { fields.push({ label: 'Владелец', key: 'client' }); }

</script>

<template>
    <Table
        @bottom-touched="() => $emit('bottomTouched')"
        :fields="fields"
        :items="props.cars"
        @delete="(id) => drop(() => dropCarWrapper(id))"
        @edit="moveToEditCarPage"
    >
        <!-- Header -->
        <template #th-client="{ label }">
            <span class="font-bold" >{{ label }}</span>
        </template>

        <!-- Body -->
        <template #td-car_model="{ value }" >
          {{ typeof value === 'object' ? `${value.car_mark.name} ${value?.name}` : value }}
        </template>

        <template #td-client="{ value }" >
          <Link :href="{name: 'EditClient', params: {id: value.id}}"> {{ value.name }} </Link>
        </template>

        <template #td-vin="{ value, item: {id} }" >
          <Link @click="()=>moveToEditCarPage(id)">{{ value }}</Link>
        </template>

        <template #td-number="{ value }" >
            {{ value }}
        </template>
        <!-- ****** -->
    </Table>
</template>
