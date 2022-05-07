<script setup>
import { DotsHorizontalIcon, PencilIcon, XIcon } from "@heroicons/vue/outline";
import { MenuButton } from "@headlessui/vue";
import OfficeLayout from "@/Layout/Office.vue";
import Header from "@/UI/Header.vue";
import Button from "@/UI/Button.vue";
import Badge from "@/UI/Badge.vue";
import Dropdown from "@/UI/Dropdown.vue";
import Link from "@/UI/Link.vue";
import { Table, THead, TBody, Tr, Td, Th } from "@/UI/Table";
import useConfirmDialog from "~/composables/useConfirmDialog.js";
import rolesService from "~/services/roles/roles.js";

let { roles, fetchRoles, movetoEditRolePage, dropRole } = rolesService();

const dialogger = useConfirmDialog();

await fetchRoles();

</script>

<template>
  <!-- Table -->
  <Table class="mt-5">

    <THead>
      <Tr> <Th>Название</Th> <Th>Дата создания</Th> <Th class="text-center">Действия</Th> </Tr>
    </THead>

    <TBody>
      <Tr v-for="(item, index) in roles" :key="item.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'" >

        <Td><Link :href="{name: 'EditRole', params: { id: item.id }}">{{ item.name }}</Link></Td>
        <Td>{{ item.created_at }}</Td>
        <Td class="text-center py-5">

          <Dropdown
            direction="right"
            position="center"
            :items="[
                      [
                        { label: 'Изменить', click: () => movetoEditRolePage(item.id), icon: PencilIcon },
                        { label: 'Удалить', click: () => dialogger.drop(() => dropRole(item.id), 'продолжить удаление!', 'Удалить ?'), icon: XIcon },
                      ],
                    ]"

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
