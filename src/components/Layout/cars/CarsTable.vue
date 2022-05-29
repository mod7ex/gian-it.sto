<script setup>
import {
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
} from '@heroicons/vue/outline';
import { MenuButton } from '@headlessui/vue';
import Button from '@/UI/Button.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table/index.js';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import carsService from '~/services/cars/cars';

const { dropCar, movetoEditCarPage } = carsService();

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

</script>

<template>
  <!-- Table -->
  <Table>

    <THead>
      <Tr>
        <Th>Автомобиль</Th>
        <Th v-if="showOwner">Владелец</Th>
        <Th>Вин номер</Th>
        <Th>Гос. номер</Th>
        <Th class="text-center">Действия</Th>
      </Tr>
    </THead>

    <TBody>
      <Tr v-for="(car, i) in props.cars" :key="car.id" :class="(i & 1) ? 'bg-white' : 'bg-gray-100'">
        <Td>{{ typeof car?.car_model === 'object' ? car?.car_model?.name : car?.car_model }}</Td>

        <Td v-if="showOwner"><Link :href="{name: 'EditClient', params: {id: car.client.id}}"> {{ car.client.name }} </Link></Td>

        <Td><Link @click="()=>movetoEditCarPage(car.id)">{{ car.vin }}</Link></Td>

        <Td>{{ car.number }}</Td>

        <Td class="text-center py-5">
          <Dropdown
            :items="[[
              {label: 'Изменить', click: ()=>movetoEditCarPage(car.id), icon: PencilIcon},
              {label: 'Удалить', click: () => drop(()=>dropCar(car.id), 'продолжить удаление!', 'Удалить ?'), icon: XIcon}
            ]]"
            direction="right"
            position="center"
          >
            <MenuButton>
              <Button type="secondary" :circle="true">
                <DotsHorizontalIcon class="w-4 h-4" />
              </Button>
            </MenuButton>
          </Dropdown>
        </Td>
      </Tr>
    </TBody>
  </Table>
</template>
