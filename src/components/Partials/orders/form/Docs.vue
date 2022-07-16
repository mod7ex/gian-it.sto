<script setup>
import { DocumentTextIcon } from '@heroicons/vue/outline';
import Button from '@/UI/Button.vue';
import Link from '@/UI/Link.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';

</script>

<template>
  <div>
      <div class="mb-5">
        <Button color="blue">
          <DocumentTextIcon class="w-5 h-5 mr-1"/>
          Добавить документ
        </Button>
      </div>

      <Table>
        <THead>
          <Tr>
            <Th>Документ</Th>
            <Th>Дата создания</Th>
            <Th>Комментарий</Th>
            <Th>Действия</Th>
          </Tr>
        </THead>
        <TBody>
        <Tr>
          <Td>
            Название
          </Td>
          <Td>
            11.11.2022
          </Td>
          <Td>
            Какой-то комментарий
          </Td>
          <Td>
            <Link>
              Посмотреть
            </Link>
          </Td>
        </Tr>
        </TBody>
      </Table>
  </div>
</template>
