<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/solid';
import Button from '@/UI/Button.vue';
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import { DescriptionListItem } from '@/UI/DescriptionList';
import LPreview from '@/Layout/users/Preview.vue';
import useConfirmDialog from '~/composables/useConfirmDialog.js';

import clients from '~/services/clients/clients.js';

const { drop } = useConfirmDialog();

const { dropClient, selectedClient: client } = clients();

const ff = {
  id: 10,
  name: 'Вера',
  surname: 'Лапин',
  middle_name: 'Никодимович',
  born_at: '10.12.1981',
  notes: 'Dicta explicabo eos quia delectus et.',
  address: 'Aut qui assumenda aut harum atque quia.',
  passport: 'Iste doloribus distinctio quo aut nihil eos beatae sequi.',
  phones: ['+7 (922) 866-8934', '(35222) 49-9002', '(35222) 33-7325'],
  gender: 'female',
  emails: ['tfrolova@fedorova.ru'],
  created_at: '07.02.2022 23:00',
  updated_at: '07.02.2022 23:00',
  department: { id: 3, name: 'Нансена 59', slug: 'nansena-59' },
  city: { id: 89, name: 'Щёлково 7798' },
};

</script>

<template>
  <l-preview :phone="client.phones[0]" :full_name="`${client.name} ${client.surname ?? ''}`">
    <template #description-list>
        <DescriptionListItem label="Телефон" :value="client.phones" type="columns" />
        <DescriptionListItem label="Почта" :value="client.emails" type="columns" />
        <DescriptionListItem label="Отдел" :value="client.department?.name" type="columns" />
        <DescriptionListItem label="Город" :value="client.city?.name" type="columns" />
        <DescriptionListItem label="Адрес" :value="client.address" type="columns" />
        <DescriptionListItem label="Паспорт" :value="client.passport" type="columns" />
        <DescriptionListItem label="Заказов на" :value="client.orders" type="columns" />
        <DescriptionListItem label="Дата рождения" :value="client.born_at" type="columns" />
        <DescriptionListItem label="О клиенте" :value="client.notes" type="columns" columns="2" />

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
            <Button type="secondary" size="xs" :link="{ name: 'EditClient', params: { id: client.id } }">
                <PencilIcon class="mr-2 h-5 w-5 text-gray-400" />Изменить
            </Button>
            <Button size="xs" color="red" @click="() => drop(() => dropClient(client.id), 'продолжить удаление!', 'Удалить ?')">
                <TrashIcon class="mr-2 h-5 w-5 text-white" />Удалить
            </Button>
        </v-can>
      </template>
  </l-preview>
</template>
