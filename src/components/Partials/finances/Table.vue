<script setup>
import { DotsHorizontalIcon, PencilIcon, XIcon } from '@heroicons/vue/outline';
import { MenuButton } from '@headlessui/vue';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import Dropdown from '@/UI/Dropdown.vue';
import Link from '@/UI/Link.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';
import service from '~/services/finances/index';
import form from '~/services/finances/form';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { setModalVisibility } = form();

const { fetchFinances, finances, dropFinance } = service();

const { drop } = useConfirmDialog();

await fetchFinances();

</script>

<template>
      <Table class="mt-5">
        <THead>
            <Tr>
                <Th>Название</Th>
                <Th>Сумма</Th>
                <Th>Тип операции</Th>
                <Th>Дата создания</Th>
                <Th class="text-center">Действия</Th>
            </Tr>
        </THead>
        <TBody>
            <Tr v-for="(item, i) in finances" :key="item.id" :class="(i&1) ? 'bg-white' : 'bg-gray-100'">
            <Td>
                <Link href="/finances/create">{{ item.name }}</Link>
            </Td>
            <Td class="font-bold">{{ 'item.sum' }} ₽</Td>
            <Td>
                <Badge :point="true" :color="(i&1) ? 'green' : 'red'">{{ 'item.type' }}</Badge>
            </Td>
            <Td>{{ 'item.created_at' }}</Td>
            <Td class="text-center py-5">
                <Dropdown
                    direction="right"
                    position="center"
                    :items="[[
                      { label: 'Изменить', click: () => setModalVisibility(true, item.id), icon: PencilIcon },
                      { label: 'Удалить', click: () => drop(() => dropFinance(item.id), 'продолжить удаление!', 'Удалить ?'), icon: XIcon },
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
