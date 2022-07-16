<script setup>
import { CogIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Badge from '@/UI/Badge.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';

</script>

<template>
    <div>

      <div class="mb-5">
        <Button color="blue">
          <CogIcon class="w-5 h-5 mr-1"/>Добавить запчасть
        </Button>
      </div>

      <Table>
        <THead>
        <Tr>
          <Th>Наименование</Th>
          <Th>Дата добавления</Th>
          <Th>Базовая цена</Th>
          <Th>Текущая цена</Th>
          <Th>Комментарий</Th>
          <Th>Статус</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr>
          <Td>
            Название запчасти <span class="text-gray-400">#2323</span>
          </Td>
          <Td>
            11.11.2022
          </Td>
          <Td>
            5 000 ₽
          </Td>
          <Td>
            7 000 ₽
          </Td>
          <Td>
            Какой-то комментарий
          </Td>
          <Td>
            <Badge :point="true" color="green">
              Выдал Иванов Иван 11.12.2022
            </Badge>
          </Td>
        </Tr>
        <Tr>
          <Td>
            Название запчасти 2 <span class="text-gray-400">#12</span>
          </Td>
          <Td>
            03.12.2021
          </Td>
          <Td>
            2 000 ₽
          </Td>
          <Td>
            5 000 ₽
          </Td>
          <Td>
            Какой-то комментарий
          </Td>
          <Td>
            <Badge :point="true" color="yellow">
              Ожидает
            </Badge>
          </Td>
        </Tr>
        </TBody>
      </Table>
    </div>
</template>
