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
import carModelForm from '~/services/cars/carModelForm';
import carModelsService from '~/services/cars/carModels';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

const { drop } = useConfirmDialog();

const { setModalVisibility } = carModelForm();

const { rawCarModels, fetchCarModels, dropCarModel } = carModelsService();

await fetchCarModels();

</script>

<template>
    <Table>
        <THead>
            <Tr>
                <Th>Название</Th>
                <Th>Марка</Th>
                <Th class="text-center">Действия</Th>
            </Tr>
        </THead>

        <TBody>
            <Tr v-for="(model, i) in rawCarModels" :key="model.id" :class="(i&1) ? 'bg-white' : 'bg-gray-100'">

                <Td>
                    <Link @click="() => setModalVisibility(true, model.id)" href="">{{ model.name }}</Link>
                </Td>

                <Td>{{ model.car_mark?.name }}</Td>

                <Td class="text-center py-5">
                    <Dropdown
                        direction="right"
                        position="center"
                        :items="[[
                                    { label: 'Изменить', click: () => setModalVisibility(true, model.id), icon: PencilIcon },
                                    { label: 'Удалить', click: () => drop(() => dropCarModel(model.id), 'продолжить удаление!', 'Удалить ?'), icon: XIcon },
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
