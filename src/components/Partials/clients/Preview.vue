<script setup>
import Link from '@/UI/Link.vue';
import Badge from '@/UI/Badge.vue';
import Avatar from '@/UI/Avatar.vue';
import { DescriptionListItem } from '@/UI/DescriptionList';

import LPreview from '@/Layout/users/Preview.vue';

</script>

<template>
    <l-preview phone="+788888888888" full_name="Абдулович Василий">
        <template #description-list>
          <DescriptionListItem label="Телефон" value="+7 900 999-99-99" type="columns" />
          <DescriptionListItem label="Почта" value="email@example.com" type="columns" />
          <DescriptionListItem label="Город" value="Ростов-на-Дону" type="columns" />
          <DescriptionListItem label="Паспорт" value="1234 123456" type="columns" />
          <DescriptionListItem label="Заказов на" value="146 000 ₽" type="columns" />
          <DescriptionListItem label="Дата рождения" value="11.06.1989" type="columns" />
          <DescriptionListItem label="О клиенте" type="columns" columns="2" value="Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu." />

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

    </l-preview>
</template>
