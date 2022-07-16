<script setup>
import { PencilIcon, XIcon, DotsHorizontalIcon, ChipIcon } from '@heroicons/vue/outline';
import { MenuButton } from '@headlessui/vue';
import Button from '@/UI/Button.vue';
import Avatar from '@/UI/Avatar.vue';
import Dropdown from '@/UI/Dropdown.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';

</script>

<template>
    <div>
      <div class="mb-5">
        <Button color="blue">
          <ChipIcon class="w-5 h-5 mr-1"/>Добавить работу
        </Button>
      </div>

      <Table>
        <THead>
        <Tr>
          <Th>Наименование</Th>
          <Th>Исполнитель</Th>
          <Th>Цена</Th>
          <Th class="text-center">Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr>
          <Td>
            Снятие и установка турбокомпрессора
          </Td>
          <Td>
            <Avatar
              title="Василий Пупкин"
              subtitle="Турбинный цех"
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            />
          </Td>
          <Td>
            7 000 ₽
          </Td>
          <Td class="text-center">
            <Dropdown
              :items="[[{label: 'Изменить', click: '', icon: PencilIcon}, {label: 'Удалить', click: '', icon: XIcon}]]"
              direction="right"
              position="center"
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
    </div>
</template>
