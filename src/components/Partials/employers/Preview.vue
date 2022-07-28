<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/solid';
import Button from '@/UI/Button.vue';
import LPreview from '@/Layout/users/Preview.vue';
import { DescriptionListItem } from '@/UI/DescriptionList';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/employees';

const { drop } = useConfirmDialog();

const { drop: dropUser, selectedUser } = store;

</script>

<template>
    <l-preview :phone="selectedUser.phone" :avatar="selectedUser.avatar" :full_name="`${selectedUser.name} ${selectedUser.surname ?? ''}`">

        <template #description-list>
            <DescriptionListItem label="Телефон" :value="selectedUser.phone" type="columns" />
            <DescriptionListItem label="Почта" :value="selectedUser.email" type="columns" />
            <DescriptionListItem label="Отдел" :value="selectedUser.department?.name" type="columns" />
            <DescriptionListItem label="Должность" :value="selectedUser.office_position" type="columns" />
            <!-- <DescriptionListItem label="Задач в работе" value="5" type="columns" /> -->
            <v-can ability="crud users" :orIf="!selectedUser.is_born_at_visible">
                <DescriptionListItem label="Дата рождения" :value="selectedUser.born_at" type="columns" />
            </v-can>
            <v-can ability="crud users" :orIf="!selectedUser.is_about_visible">
                <DescriptionListItem label="О сотруднике" type="columns" columns="2" :value="selectedUser.about" />
            </v-can>

        </template>

        <template #actions>
            <v-can ability="crud users" class="px-6 flex justify-between">
                <Button type="secondary" size="xs" :link="{ name: 'EditEmployer', params: { id: selectedUser.id } }">
                    <PencilIcon class="mr-2 h-5 w-5 text-gray-400" />Изменить
                </Button>

                <Button size="xs" color="red" @click="() => drop(() => dropUser(selectedUser.id))">
                    <TrashIcon class="mr-2 h-5 w-5 text-white" />Удалить
                </Button>
            </v-can>
        </template>

    </l-preview>
</template>
