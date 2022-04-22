<script setup>
import OfficeLayout from "@/Layout/Office.vue";
import Button from "@/UI/Button.vue";
import Spinner from "@/UI/Spinner.vue";
import { PlusCircleIcon, ArrowLeftIcon } from "@heroicons/vue/outline";

import RolesTable from "~/components/Partials/RolesTable.vue";
</script>

<template>
  <OfficeLayout title="Роли">
    <template #actions>
      <Button type="secondary" link="/employers">
        <ArrowLeftIcon class="w-5 h-5 mr-1" />
        сотрудникам
      </Button>

      <Button color="blue" link="/roles/create">
        <PlusCircleIcon class="w-5 h-5 mr-1" />
        Создать
      </Button>
    </template>

    <Suspense>
      <RolesTable />

      <template #fallback>
        <div class="flex justify-center">
          <Spinner h="4" w="4">
            <span class="text-sm text-gray-600">получаем роли...</span>
          </Spinner>
        </div>
      </template>
    </Suspense>
  </OfficeLayout>
</template>

<style scoped></style>
