<script setup>
import Input from '@/UI/Input.vue';
import Select from '@/UI/Select.vue';
import TextArea from '@/UI/TextArea.vue';

/*

1.ВИД работы (наименование работы)
2.Количество
3.Исполнитель (кто делал сотрудник)
4.Норма времени ( количество требуемого времени)
5.Цена
6.Сумма
7.Субподряд ( работу делал наш контрагент, где то делали на удаленки, нам нужно выбрать контрагента)
8.Материалы (материалы используемые при ремонте за которые клиент не платит, а. они просто списываются со склада по закупочной стоимости) выбираем номенклатуру по складу

*/

</script>

<template>
    <div class="grid grid-cols-12">
        <Input
          label="Вид работы"
          :required="true"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Input
          label="Количество"
          type="number"
          :required="true"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Select
          label="Исполнитель"
          :options="[]"
          :required="true"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Input
          label="Kоличество требуемого времени (часы)"
          type="number"
          :required="true"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Input
          label="Цена"
          type="number"
          :required="true"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Input
          label="Сумма"
          type="number"
          :required="true"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <Select
          label="Субподряд"
          :options="[]"
          :required="true"
          class="m-3 sm:col-span-6 col-span-12"
        />

        <TextArea
          label="Материалы"
          :required="true"
          class="m-3 sm:col-span-6 col-span-12"
        />

    </div>
</template>
