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
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';
import service from '~/services/finances/groups';
import form from '~/services/finances/groups/form';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const { rawGroups, fetchGroups, dropGroup } = service();
const { setModalVisibility } = form();

await fetchGroups();

</script>

<template>
    <Table class="mt-5">
        <THead>
            <Tr>
                <Th>Название</Th>
                <Th>Дата создания</Th>
                <Th class="text-center">Действия</Th>
            </Tr>
        </THead>

        <TBody>
            <Tr v-for="(item, i) in rawGroups" :key="item.id" :class="(i&1) ? 'bg-white' : 'bg-gray-100'">
                <Td>
                    <Link @click="() => setModalVisibility(true, item.id)" href="">{{ item.name }}</Link>
                </Td>
                <Td>
                    {{ item.created_at }}
                </Td>
                <Td class="text-center py-5">
                    <Dropdown
                        direction="right"
                        position="center"
                        :items="[[
                                    { label: 'Изменить', click: () => setModalVisibility(true, item.id), icon: PencilIcon },
                                    { label: 'Удалить', click: () => drop(() => dropGroup(item.id), 'продолжить удаление!', 'Удалить ?'), icon: XIcon },
                                ]]"

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
