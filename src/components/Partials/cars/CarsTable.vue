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
import carsService from '~/services/cars/cars';
import CarsTable from '~/components/Layout/cars/CarsTable.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { cars, fetchCars } = carsService();

const { drop } = useConfirmDialog();

await fetchCars();

</script>

<template>
  <cars-table :cars="cars" />
</template>
