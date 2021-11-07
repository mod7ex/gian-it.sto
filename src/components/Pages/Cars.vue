<script setup>
import {
  PlusCircleIcon,
  DotsHorizontalIcon,
  PencilIcon,
  XIcon,
  GlobeIcon,
  ArrowsExpandIcon,
  UserGroupIcon,
} from '@heroicons/vue/outline';
import {MenuButton} from '@headlessui/vue';
import OfficeLayout from '@/Layout/Office.vue';
import Header from '@/UI/Header.vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
import Cars from '@/Partials/Cars.vue';
import {Table, THead, TBody, Tr, Td, Th} from '@/UI/Table/index.js';
</script>

<template>
  <OfficeLayout title="Автомобили">
    <template #actions>
      <Button type="secondary" link="/car-marks">
        <GlobeIcon class="w-5 h-5 mr-1" />
        Марки автомобилей
      </Button>

      <Button type="secondary" link="/car-models">
        <ArrowsExpandIcon class="w-5 h-5 mr-1" />
        Модели автомобилей
      </Button>

      <Button type="secondary" link="/clients">
        <UserGroupIcon class="w-5 h-5 mr-1" />
        Клиенты
      </Button>

      <Button color="blue" link="/cars/create">
        <PlusCircleIcon class="w-5 h-5 mr-1"/>
        Создать
      </Button>
    </template>

    <Cars class="mt-5" />
  </OfficeLayout>
</template>

<style scoped>

</style>
