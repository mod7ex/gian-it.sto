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
import carMarkForm from '~/services/cars/carMarkForm';
import carMarksService from '~/services/cars/carMarks';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const { setModalVisibility }  = carMarkForm();

const {
  rawCarMarks,
  fetchCarMarks,
  dropCarMark,
}  = carMarksService();

await fetchCarMarks();

</script>

<template>
    <Table>

      <THead>
        <Tr>
            <Th>Название</Th>
            <Th class="text-center">Действия</Th>
        </Tr>
      </THead>

      <TBody>
        <Tr v-for="(mark, index) in rawCarMarks" :key="mark.id" :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-100'">

            <Td>
                <Link @click="() => setModalVisibility(true, mark.id)" href="">{{ mark.name }}</Link>
            </Td>

            <Td class="text-center py-5">
                <Dropdown
                    direction="right"
                    position="center"
                    :items="[[
                                { label: 'Изменить', click: () => setModalVisibility(true, mark.id), icon: PencilIcon },
                                { label: 'Удалить', click: () => drop(() => dropCarMark(mark.id), 'продолжить удаление!', 'Удалить ?'), icon: XIcon },
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
