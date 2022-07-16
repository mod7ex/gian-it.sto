<script setup>
import { CurrencyDollarIcon } from '@heroicons/vue/outline';
import Link from '@/UI/Link.vue';
import Button from '@/UI/Button.vue';
import { Table, THead, TBody, Tr, Td, Th } from '@/UI/Table';

</script>

<template>
    <div>
      <div class="mb-5">
        <Button color="blue">
          <CurrencyDollarIcon class="w-5 h-5 mr-1"/>Добавить оплату
        </Button>
      </div>
      <Table>
        <THead>
        <Tr>
          <Th>Плательщик</Th>
          <Th>Дата создания</Th>
          <Th>Способ оплаты</Th>
          <Th>Комментарий</Th>
          <Th>Действия</Th>
        </Tr>
        </THead>
        <TBody>
        <Tr>
          <Td>
            Иванов Иван Иванович
          </Td>
          <Td>
            11.11.2022
          </Td>
          <Td>
            Терминал
          </Td>
          <Td>
            Преодоплата
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
