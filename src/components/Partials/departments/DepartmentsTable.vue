<script setup>
import { DotsHorizontalIcon, PencilIcon, XIcon } from "@heroicons/vue/outline";
import { MenuButton } from "@headlessui/vue";
import OfficeLayout from "@/Layout/Office.vue";
import Header from "@/UI/Header.vue";
import Button from "@/UI/Button.vue";
// import Badge from "@/UI/Badge.vue";
import Dropdown from "@/UI/Dropdown.vue";
import Link from "@/UI/Link.vue";
import { Table, THead, TBody, Tr, Td, Th } from "@/UI/Table";
import useConfirmDialog from "~/composables/useConfirmDialog.js";
import departmentsService from "~/services/departments/departments.js";
import departmentForm from '~/services/departments/departmentForm.js';

const { setModalVisibility } = departmentForm();

let { fetchDepartments, movetoEditDepartmentPage, dropDepartment, departments } = departmentsService();

const dialogger = useConfirmDialog();

/* ************ Fetch departments ************ */
await fetchDepartments();

</script>

<template>
  <!-- Table -->
  <Table class="mt-5">
    <THead>
      <Tr>
        <Th>Название</Th>
        <!-- <Th>Дата создания</Th> -->
        <Th class="text-center">Действия</Th>
      </Tr>
    </THead>

    <TBody>
      <Tr v-for="(item, index) in departments" :key="item.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'" >

        <Td><Link @click="() => setModalVisibility(true, item.id)" href="">{{ item.name }}</Link></Td>
        <!-- <Td><Badge :point="true" color="blue" >{{ item.created_at }}</Badge></Td> -->
        <Td class="text-center py-5">
          <Dropdown
            direction="right"
            position="center"
            :items="[[
                      { label: 'Изменить', click: () => setModalVisibility(true, item.id), icon: PencilIcon },
                      { label: 'Удалить', click: () => dialogger.drop(() => dropDepartment(item.id), 'продолжить удаление!', 'Удалить ?'), icon: XIcon },
                    ]]"

            >
            <menu-button>
              <Button type="secondary" :circle="true">
                <DotsHorizontalIcon class="w-4 h-4" />
              </Button>
            </menu-button>

          </Dropdown>
        </Td>
      </Tr>
    </TBody>
  </Table>
</template>
