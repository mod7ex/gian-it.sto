<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/solid';
import Button from '@/UI/Button.vue';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import { DescriptionListItem } from '@/UI/DescriptionList';
import LPreview from '@/Layout/users/Preview.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';
import store from '~/store/clients';

const { drop } = useConfirmDialog();

const { drop: dropClient, selectedUser } = store;

</script>

<template>
  <l-preview :phone="selectedUser.phones[0]" :full_name="`${selectedUser.name} ${selectedUser.surname ?? ''}`">
    <template #description-list>
        <DescriptionListItem label="Телефон" :value="selectedUser.phones" type="columns" />
        <DescriptionListItem label="Почта" :value="selectedUser.emails" type="columns" />
        <DescriptionListItem label="Отдел" :value="selectedUser.department?.name" type="columns" />
        <DescriptionListItem label="Город" :value="selectedUser.city?.name" type="columns" />
        <DescriptionListItem label="Адрес" :value="selectedUser.address" type="columns" />
        <DescriptionListItem label="Паспорт" :value="selectedUser.passport" type="columns" />
        <DescriptionListItem label="Заказов на" :value="selectedUser.orders" type="columns" />
        <DescriptionListItem label="Дата рождения" :value="selectedUser.born_at" type="columns" />
        <DescriptionListItem label="О клиенте" :value="selectedUser.notes" type="columns" columns="2" />

        <DescriptionListItem label="Заказ-наряды" type="columns" columns="2">
          <div class="grid grid-cols-12 mt-1 gap-2">
            <div class="sm:col-span-6 col-span-12 shadow border px-4 py-2 rounded">
              <div class="flex justify-between items-center">
                <div class="text-sm mb-2 font-bold"><Link>Заказ наряд #0001</Link></div>
                <Badge color="green">Завершён</Badge>
              </div>
              <Avatar
                class="mb-1"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                title="Тим Кук"
                subtitle="Ответственный"
              />
            </div>
            <div class="sm:col-span-6 col-span-12 shadow border px-4 py-2 rounded">
              <div class="flex justify-between items-center">
                <div class="text-sm mb-2 font-bold"><Link>Заказ наряд #0002</Link></div>

                <Badge color="yellow">В работе</Badge>
              </div>
              <Avatar
                class="mb-1"
                image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                title="Тим Кук"
                subtitle="Ответственный"
              />
            </div>
          </div>
        </DescriptionListItem>
      </template>

      <template #actions>
        <v-can ability="crud clients" class="px-6 flex justify-between">
            <Button type="secondary" size="xs" :link="{ name: 'EditClient', params: { id: selectedUser.id } }">
                <PencilIcon class="mr-2 h-5 w-5 text-gray-400" />Изменить
            </Button>
            <Button size="xs" color="red" @click="() => drop(() => dropClient(selectedUser.id), 'продолжить удаление!', 'Удалить ?')">
                <TrashIcon class="mr-2 h-5 w-5 text-white" />Удалить
            </Button>
        </v-can>
      </template>
  </l-preview>
</template>
