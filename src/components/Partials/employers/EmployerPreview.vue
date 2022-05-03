<script setup>
import {
  PencilIcon,
  TrashIcon,
  PhoneIcon,
} from '@heroicons/vue/solid';
import Button from '@/UI/Button.vue';
import {
  DescriptionList,
  DescriptionListItems,
  DescriptionListItem,
} from '@/UI/DescriptionList';

import useConfirmDialog from '~/composables/useConfirmDialog.js';

import employers from '~/services/employers.js';

const dialogger = useConfirmDialog();

const { dropUser, selectedUser } = employers();
</script>

<template>
    <div class="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
        <!-- Profile header -->
        <article>
        <div
            class="border-b border-gray-200 flex justify-between px-4 sm:px-6 py-3 lg:items-end items-baseline lg:flex-row flex-col gap-2"
        >
            <div class="flex items-end">
            <img
                :src="selectedUser.avatar ? selectedUser.avatar : ''"
                class="w-32 rounded-full"
            />

            <h1 class="text-2xl font-bold text-gray-900 truncate ml-2">
                {{ `${selectedUser.name} ${selectedUser.surname ? selectedUser.surname : ""}` }}
            </h1>
            </div>

            <Button type="secondary" size="sm">
            <a
                :href="`tel:${selectedUser.phone}`"
                class="flex items-center"
            >
                <PhoneIcon class="mr-2 h-5 w-5 text-gray-400" />
                Позвонить
            </a>
            </Button>
        </div>

        <!-- Description list -->
        <DescriptionList
            :bordered="false"
            class="mt-5 mb-10"
            type="columns"
        >
            <DescriptionListItems type="columns">
            <DescriptionListItem
                label="Телефон"
                :value="selectedUser.phone"
                type="columns"
            />
            <DescriptionListItem
                label="Почта"
                :value="selectedUser.email"
                type="columns"
            />
            <DescriptionListItem
                label="Город / Отдел"
                :value="selectedUser.city"
                type="columns"
            />
            <DescriptionListItem
                label="Должность"
                :value="selectedUser.office_position"
                type="columns"
            />
            <DescriptionListItem
                label="Задач в работе"
                value="5"
                type="columns"
            />
            <DescriptionListItem
                label="Дата рождения"
                :value="selectedUser.born_at"
                type="columns"
            />
            <DescriptionListItem
                label="О сотруднике"
                type="columns"
                columns="2"
                :value="selectedUser.about"
            />
            </DescriptionListItems>
        </DescriptionList>

        <!-- Actions -->
        <div class="px-6 flex justify-between">
            <Button type="secondary" size="xs" :link="{ name: 'EditEmployer', params: { id: selectedUser.id } }">
                <PencilIcon class="mr-2 h-5 w-5 text-gray-400" />
                Изменить
            </Button>

            <Button
                size="xs"
                color="red"
                @click="() => dialogger.drop(() => dropUser(selectedUser.id), 'продолжить удаление!', 'Удалить ?')"
            >
                <TrashIcon class="mr-2 h-5 w-5 text-white" />Удалить
            </Button>
        </div>
        </article>
    </div>
</template>
